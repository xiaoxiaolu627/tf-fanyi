import { API_CONFIG, TranslationRequest, TranslationResponse } from '../config/api';

const TYPE_DESCRIPTIONS = {
  T: {
    name: '理性思考的人',
    characteristics: '习惯用逻辑分析问题，关注事实和效率，说话比较直接',
    communication: '偏爱听到具体的解决方案、数据支撑、逻辑分析'
  },
  F: {
    name: '情感感受的人', 
    characteristics: '很在意感受和关系，关心他人情绪，说话会考虑对方感受',
    communication: '希望被理解、被关心，喜欢温暖的沟通方式'
  }
};

function buildPrompt(message: string, selfType: 'T' | 'F', targetType: 'T' | 'F'): string {
  const targetDesc = TYPE_DESCRIPTIONS[targetType];
  const selfDesc = TYPE_DESCRIPTIONS[selfType];
  
  const translationStyle = selfType === 'T' 
    ? '用逻辑和事实来解释，重点说明对方的真实需求和担心的问题'
    : '用情感和感受来解释，重点说明对方的内心感受和人际关系考虑';
  
  const replyStyle = targetType === 'T'
    ? '要具体、直接、有逻辑，提供实际的解决方案'
    : '要温暖、体贴、有同理心，表达理解和关心';

  return `你是一个很懂人心的沟通翻译官。有人说了一句话，但听的人没完全理解对方的真正意思，需要你来"翻译"一下。

**现在的情况：**
- 说话的人：${targetDesc.name}（${targetDesc.characteristics}）
- 听话的人：${selfDesc.name}（${selfDesc.characteristics}）

**对方说的原话：**
"${message}"

**你要做的事：**
1. 翻译：告诉听话的人，对方这句话背后真正想表达什么意思、什么感受、什么需求
2. 建议：提供3个回复方式，让听话的人能用对方容易接受的方式回应

**翻译的风格：**
${translationStyle}

**回复建议的风格：**
${replyStyle}

**重要提醒：**
- 用大白话，不要官方语言
- 要像你真的认识这两个人，了解他们的性格
- 翻译要让人恍然大悟："原来是这样！"
- 建议要实用，就像朋友之间的聊天建议

**输出格式（必须是纯JSON）：**
{
  "translation": "对方其实想说...",
  "suggestions": [
    "建议回复1",
    "建议回复2", 
    "建议回复3"
  ]
}`;
}

export async function translateMessage(request: TranslationRequest): Promise<TranslationResponse> {
  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: API_CONFIG.MODEL_NAME,
        messages: [
          {
            role: 'user',
            content: buildPrompt(request.message, request.selfType, request.targetType)
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('API 返回内容为空');
    }

    // 尝试解析 JSON 响应
    try {
      const parsed = JSON.parse(content);
      return {
        translation: parsed.translation || '解析错误：未找到翻译内容',
        suggestions: parsed.suggestions || ['生成建议时出现错误']
      };
    } catch (parseError) {
      // 如果 JSON 解析失败，尝试从文本中提取内容
      console.warn('JSON 解析失败，尝试文本解析:', parseError);
      return {
        translation: content.includes('translation') 
          ? content.split('translation')[1]?.split('suggestions')[0]?.replace(/[:"]/g, '').trim() || content
          : content,
        suggestions: ['请重新尝试获取回复建议']
      };
    }
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    throw new Error(error instanceof Error ? error.message : '未知错误');
  }
} 
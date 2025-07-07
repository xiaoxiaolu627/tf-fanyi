import { API_CONFIG, TranslationRequest, TranslationResponse } from '../config/api';
import { Language } from '../config/i18n';

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

function buildPrompt(message: string, selfType: 'T' | 'F', targetType: 'T' | 'F', language: Language = 'zh'): string {
  if (language === 'en') {
    return buildEnglishPrompt(message, selfType, targetType);
  }
  return buildChinesePrompt(message, selfType, targetType);
}

function buildChinesePrompt(message: string, selfType: 'T' | 'F', targetType: 'T' | 'F'): string {
  const targetDesc = TYPE_DESCRIPTIONS[targetType];
  const selfDesc = TYPE_DESCRIPTIONS[selfType];
  
  const translationStyle = selfType === 'T' 
    ? '用逻辑和事实来解释，重点说明对方的真实需求和担心的问题'
    : '用情感和感受来解释，重点说明对方的内心感受和人际关系考虑';
  
  // 更自然的回复风格指导
  const replyExamples = targetType === 'T' 
    ? {
        style: '直接、简洁、实用',
        examples: [
          '简短确认："好的，我来处理"',
          '解决问题："我理解你的担心，咱们这样..."',
          '务实回应："确实，那我们就..."'
        ]
      }
    : {
        style: '温暖、关心、有感情',
        examples: [
          '共情理解："我明白你的感受，我也会这样想"',
          '表达感谢："谢谢你告诉我这些"',
          '主动关心："你辛苦了，需要我帮什么吗？"'
        ]
      };

  return `你是一个很懂人际关系的朋友，在帮两个朋友更好地理解对方。

**情况：**
对方是${targetDesc.name}，${targetDesc.characteristics}
我是${selfDesc.name}，${selfDesc.characteristics}

**对方说的话：**
"${message}"

**帮我做两件事：**

1. **翻译**：用${translationStyle}，告诉我对方话里的真正意思

2. **教我怎么回**：给我3个自然的回复，要像平时聊天一样，${replyExamples.style}

**回复要求：**
- 就像你平时和朋友聊天那样自然，带点口语化
- 不要太正式，不要像客服或官方回复
- 3个回复要有不同的长度和语气：一个简短、一个中等、一个详细
- 可以用"嗯"、"哦"、"好吧"、"是吗"等自然的语气词
- 参考这种感觉：${replyExamples.examples.join('、')}
- 避免"我觉得"、"我建议"、"您"等过于正式的表达

**重要：输出严格的JSON格式，不要在字符串中使用引号，用其他标点替代**
{
  "translation": "TA其实想表达的真正意思...",
  "suggestions": [
    "具体的回复1",
    "具体的回复2", 
    "具体的回复3"
  ]
}`;
}

function buildEnglishPrompt(message: string, selfType: 'T' | 'F', targetType: 'T' | 'F'): string {
  const targetDesc = selfType === 'T' 
    ? { name: 'Rational Thinker', characteristics: 'focuses on logic, facts, and efficiency, speaks directly' }
    : { name: 'Emotional Feeler', characteristics: 'cares about feelings and relationships, considers emotions when speaking' };
  
  const selfDesc = targetType === 'T'
    ? { name: 'Rational Thinker', characteristics: 'focuses on logic, facts, and efficiency, speaks directly' }
    : { name: 'Emotional Feeler', characteristics: 'cares about feelings and relationships, considers emotions when speaking' };
  
  const translationStyle = selfType === 'T' 
    ? 'using logic and facts, focus on their real needs and concerns'
    : 'using emotions and feelings, focus on their inner feelings and relationship considerations';
  
  const replyExamples = targetType === 'T' 
    ? {
        style: 'direct, concise, practical',
        examples: [
          'Brief confirmation: "Got it, I\'ll handle this"',
          'Problem-solving: "I understand your concern, let\'s..."',
          'Practical response: "Right, so we should..."'
        ]
      }
    : {
        style: 'warm, caring, emotional',
        examples: [
          'Empathetic understanding: "I get how you feel, I\'d think the same"',
          'Expressing gratitude: "Thanks for telling me this"',
          'Proactive care: "You\'ve been working hard, need any help?"'
        ]
      };

  return `You are a friend who understands interpersonal relationships well, helping two friends better understand each other.

**Situation:**
The speaker is a ${targetDesc.name}, ${targetDesc.characteristics}
I am a ${selfDesc.name}, ${selfDesc.characteristics}

**What they said:**
"${message}"

**Help me with two things:**

1. **Translation**: ${translationStyle}, tell me what they really mean

2. **How to respond**: Give me 3 natural replies, like casual conversation, ${replyExamples.style}

**Reply requirements:**
- Natural as daily chat with friends, conversational tone
- Not formal, not like customer service or official responses
- 3 different lengths and tones: one brief, one medium, one detailed
- Can use "hmm", "oh", "well", "really?" and other natural expressions
- Reference this feeling: ${replyExamples.examples.join(', ')}
- Avoid "I think", "I suggest", formal expressions

**Important: Output strict JSON format, avoid quotes inside strings, use other punctuation instead**
{
  "translation": "What they really want to express...",
  "suggestions": [
    "Specific reply 1",
    "Specific reply 2", 
    "Specific reply 3"
  ]
}`;
}

export async function translateMessage(request: TranslationRequest): Promise<TranslationResponse> {
  // 检查 API 密钥是否配置
  if (!API_CONFIG.DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API 密钥未配置。请联系管理员设置环境变量 VITE_DEEPSEEK_API_KEY');
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
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
            content: buildPrompt(request.message, request.selfType, request.targetType, request.language)
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API错误响应:', errorText);
      throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('API 返回内容为空');
    }

    // 处理可能被包装在 markdown 代码块中的 JSON
    let cleanContent = content;
    if (content.includes('```json')) {
      // 提取 ```json 和 ``` 之间的内容
      const jsonStart = content.indexOf('```json') + 7;
      const jsonEnd = content.indexOf('```', jsonStart);
      if (jsonEnd !== -1) {
        cleanContent = content.substring(jsonStart, jsonEnd).trim();
      } else {
        cleanContent = content.replace(/```json\n?/g, '').replace(/\n?```/g, '');
      }
    }
    
    // 清理中文引号和其他特殊字符
    cleanContent = cleanContent
      .replace(/"/g, '"')  // 中文左引号
      .replace(/"/g, '"')  // 中文右引号
      .replace(/'/g, "'")  // 中文左单引号
      .replace(/'/g, "'"); // 中文右单引号

    // 尝试解析 JSON 响应
    try {
      const parsed = JSON.parse(cleanContent);
      return {
        translation: parsed.translation || '解析错误：未找到翻译内容',
        suggestions: parsed.suggestions || ['生成建议时出现错误']
      };
    } catch (parseError) {
      // 如果 JSON 解析失败，尝试从文本中提取内容
      console.warn('JSON 解析失败，尝试文本解析:', parseError);
      console.log('原始API返回内容:', content);
      console.log('清理后内容:', cleanContent);
      return {
        translation: cleanContent.includes('translation') 
          ? cleanContent.split('translation')[1]?.split('suggestions')[0]?.replace(/[:"]/g, '').trim() || cleanContent
          : cleanContent,
        suggestions: ['AI回复格式异常，请重新尝试']
      };
    }
  } catch (error) {
    console.error('DeepSeek API 调用失败:', error);
    throw new Error(error instanceof Error ? error.message : '未知错误');
  }
} 
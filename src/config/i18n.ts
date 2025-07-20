export type Language = 'zh' | 'en';

export interface Translations {
  title: string;
  subtitle: string;
  reset: string;
  typeSettings: string;
  myType: string;
  targetType: string;
  tType: string;
  fType: string;
  tDescription: string;
  fDescription: string;
  messageInput: string;
  translate: string;
  translationResult: string;
  humanPerspective: string;
  smartReplySuggestions: string;
  suitableFor: string;
  conversationHistory: string;
  clear: string;
  example: string;
  sessionStats: string;
  translationsCount: string;
  lastUpdate: string;
  footerText: string;
  poweredBy: string;
  bridgeCommunication: string;
  aiProcessing: string;
  retryTranslation: string;
  copySuccess: string;
  errorMessage: string;
  networkError: string;
  thinking: string;
  feeling: string;
  
  // 用户引导流程翻译
  onboarding: {
    // 欢迎页面
    welcome: {
      title: string;
      subtitle: string;
      understandDifferences: string;
      understandDifferencesDesc: string;
      aiTranslation: string;
      aiTranslationDesc: string;
      improveRelationships: string;
      improveRelationshipsDesc: string;
      startTest: string;
      skipGuide: string;
    };
    
    // 性格测试
    personalityTest: {
      title: string;
      subtitle: string;
      question: string;
      testComplete: string;
      yourCharacteristics: string;
      tryFeatures: string;
      
      // T型特点
      tTraits: string[];
      
      // F型特点  
      fTraits: string[];
      
      // 测试题目
      questions: Array<{
        question: string;
        options: Array<{
          text: string;
          type: 'T' | 'F';
        }>;
      }>;
    };
    
    // 功能演示
    demo: {
      title: string;
      subtitle: string;
      demoScenario: string;
      theirMessage: string;
      aiTranslationLabel: string;
      smartReplySuggestionsLabel: string;
      startUsing: string;
      
      // 演示内容
      exampleInput: string;
      exampleTranslation: string;
      exampleReplies: string[];
    };
    
    // 完成页面
    complete: {
      title: string;
      subtitle: string;
      usageTips: string;
      startTranslating: string;
      
      // 使用小贴士
      tips: string[];
    };
    
    // 通用
    common: {
      skip: string;
      typeThinking: string;
      typeFeeling: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    title: 'T/F 沟通翻译器',
    subtitle: '用真人视角翻译，让思考型和情感型更好地理解彼此',
    reset: '重置',
    typeSettings: '设置类型',
    myType: '我的类型',
    targetType: '对方类型',
    tType: 'T型 (思考)',
    fType: 'F型 (情感)',
    tDescription: '理性思考的人',
    fDescription: '情感感受的人',
    messageInput: '对方的话',
    translate: '翻译',
    translationResult: '翻译结果',
    humanPerspective: '真人视角解读',
    smartReplySuggestions: '智能回复建议',
    suitableFor: '适合',
    conversationHistory: '对话历史',
    clear: '清空',
    example: '示例',
    sessionStats: '本次会话',
    translationsCount: '次翻译',
    lastUpdate: '最近更新',
    footerText: '让 MBTI 中的思考型 (T) 和情感型 (F) 沟通更顺畅',
    poweredBy: '基于',
    bridgeCommunication: '让理解成为沟通的桥梁',
    aiProcessing: 'AI正在理解中...',
    retryTranslation: '请重新尝试获取回复建议',
    copySuccess: '已复制',
    errorMessage: '翻译失败，请重试',
    networkError: '网络连接异常',
    thinking: '思考',
    feeling: '情感',
    
    onboarding: {
      welcome: {
        title: '欢迎使用 T/F 沟通翻译器',
        subtitle: '让 AI 帮你理解不同性格的人在说什么，学会用对方能理解的方式回应',
        understandDifferences: '理解差异',
        understandDifferencesDesc: '发现T型和F型思维方式的不同，理解沟通障碍的根源',
        aiTranslation: 'AI 翻译',
        aiTranslationDesc: '用真人视角解读对方话语的真实含义，避免误解',
        improveRelationships: '改善关系',
        improveRelationshipsDesc: '学会用对方喜欢的方式沟通，让关系更融洽',
        startTest: '开始测试',
        skipGuide: '跳过引导'
      },
      
      personalityTest: {
        title: '快速性格测试',
        subtitle: '回答几个问题，帮我们了解你的沟通风格',
        question: '问题',
        testComplete: '测试完成！',
        yourCharacteristics: '你的特点：',
        tryFeatures: '体验功能',
        
        tTraits: [
          '重视逻辑和客观分析',
          '以事实和数据为导向',
          '追求效率和准确性',
          '偏好直接、具体的表达'
        ],
        
        fTraits: [
          '重视情感和人际和谐',
          '以价值观和感受为导向',
          '关注他人的情感需求',
          '偏好温和、体贴的表达'
        ],
        
        questions: [
          {
            question: '在做重要决定时，你更倾向于：',
            options: [
              { text: '仔细分析利弊，用逻辑和数据来决定', type: 'T' },
              { text: '考虑对相关人员的影响，重视大家的感受', type: 'F' }
            ]
          },
          {
            question: '当朋友向你抱怨工作时，你通常会：',
            options: [
              { text: '帮助分析问题原因，提供具体的解决方案', type: 'T' },
              { text: '先理解和共情朋友的感受，给予情感支持', type: 'F' }
            ]
          },
          {
            question: '在团队冲突中，你认为最重要的是：',
            options: [
              { text: '找出事实真相，用客观标准来判断对错', type: 'T' },
              { text: '维护团队和谐，照顾每个人的情绪和关系', type: 'F' }
            ]
          },
          {
            question: '收到批评反馈时，你更关注：',
            options: [
              { text: '反馈内容是否客观准确，有哪些可以改进', type: 'T' },
              { text: '对方的表达方式，以及自己的感受如何', type: 'F' }
            ]
          }
        ]
      },
      
      demo: {
        title: '功能演示',
        subtitle: '看看翻译器是如何工作的',
        demoScenario: '演示场景',
        theirMessage: '对方的话 (F型说给T型听):',
        aiTranslationLabel: 'AI 翻译 (真人视角)',
        smartReplySuggestionsLabel: '智能回复建议',
        startUsing: '开始使用',
        
        exampleInput: '"我觉得这个决定不太好，总感觉哪里不对劲..."',
        exampleTranslation: '"对方其实是在委婉地表达不满，可能觉得决定不够周全或忽略了某些重要因素。TA担心直接批评会伤害关系，所以用模糊的表达来暗示需要重新考虑。"',
        exampleReplies: [
          '好的，我来重新看看',
          '你说得对，让我们再讨论一下具体哪里需要调整',
          '谢谢提醒，确实这个决定还有改进空间，你觉得主要问题在哪？'
        ]
      },
      
      complete: {
        title: '准备就绪！',
        subtitle: '现在你可以开始使用 T/F 沟通翻译器了。记住，更好的沟通从理解开始！',
        usageTips: '使用小贴士：',
        startTranslating: '开始翻译',
        
        tips: [
          '输入对方的原话，AI 会帮你理解真实含义',
          '选择正确的类型组合，获得更准确的翻译',
          '参考 AI 的回复建议，但要结合具体情况使用'
        ]
      },
      
      common: {
        skip: '跳过',
        typeThinking: 'T型 (思考型)',
        typeFeeling: 'F型 (情感型)'
      }
    }
  },
  en: {
    title: 'T/F Communication Translator',
    subtitle: 'Bridge understanding between Thinking and Feeling types with human perspective',
    reset: 'Reset',
    typeSettings: 'Type Settings',
    myType: 'My Type',
    targetType: 'Target Type',
    tType: 'T-Type (Thinking)',
    fType: 'F-Type (Feeling)',
    tDescription: 'Rational Thinker',
    fDescription: 'Emotional Feeler',
    messageInput: 'Their Message',
    translate: 'Translate',
    translationResult: 'Translation Result',
    humanPerspective: 'Human Perspective Analysis',
    smartReplySuggestions: 'Smart Reply Suggestions',
    suitableFor: 'For',
    conversationHistory: 'Conversation History',
    clear: 'Clear',
    example: 'Example',
    sessionStats: 'This session',
    translationsCount: 'translations',
    lastUpdate: 'Last update',
    footerText: 'Bridge communication between MBTI Thinking (T) and Feeling (F) types',
    poweredBy: 'Powered by',
    bridgeCommunication: 'Making understanding the bridge of communication',
    aiProcessing: 'AI is processing...',
    retryTranslation: 'Please retry to get reply suggestions',
    copySuccess: 'Copied',
    errorMessage: 'Translation failed, please retry',
    networkError: 'Network connection error',
    thinking: 'Thinking',
    feeling: 'Feeling',
    
    onboarding: {
      welcome: {
        title: 'Welcome to T/F Communication Translator',
        subtitle: 'Let AI help you understand what different personality types really mean, and learn to respond in ways they can understand',
        understandDifferences: 'Understand Differences',
        understandDifferencesDesc: 'Discover differences between T and F thinking patterns, understand root causes of communication barriers',
        aiTranslation: 'AI Translation',
        aiTranslationDesc: 'Interpret real meaning behind words from human perspective, avoid misunderstandings',
        improveRelationships: 'Improve Relationships',
        improveRelationshipsDesc: 'Learn to communicate in ways others prefer, build better relationships',
        startTest: 'Start Test',
        skipGuide: 'Skip Guide'
      },
      
      personalityTest: {
        title: 'Quick Personality Test',
        subtitle: 'Answer a few questions to help us understand your communication style',
        question: 'Question',
        testComplete: 'Test Complete!',
        yourCharacteristics: 'Your Characteristics:',
        tryFeatures: 'Try Features',
        
        tTraits: [
          'Value logic and objective analysis',
          'Data and fact-oriented',
          'Pursue efficiency and accuracy',
          'Prefer direct, specific expression'
        ],
        
        fTraits: [
          'Value emotions and interpersonal harmony',
          'Values and feelings-oriented',
          'Care about others\' emotional needs',
          'Prefer gentle, considerate expression'
        ],
        
        questions: [
          {
            question: 'When making important decisions, you tend to:',
            options: [
              { text: 'Analyze pros and cons carefully, using logic and data', type: 'T' },
              { text: 'Consider impact on people involved, value everyone\'s feelings', type: 'F' }
            ]
          },
          {
            question: 'When a friend complains about work, you usually:',
            options: [
              { text: 'Help analyze the problem and provide specific solutions', type: 'T' },
              { text: 'First understand and empathize, give emotional support', type: 'F' }
            ]
          },
          {
            question: 'In team conflicts, you think the most important thing is:',
            options: [
              { text: 'Find the truth, use objective standards to judge right and wrong', type: 'T' },
              { text: 'Maintain team harmony, care for everyone\'s emotions and relationships', type: 'F' }
            ]
          },
          {
            question: 'When receiving criticism, you focus more on:',
            options: [
              { text: 'Whether the feedback is objective and what can be improved', type: 'T' },
              { text: 'How it\'s expressed and how you feel about it', type: 'F' }
            ]
          }
        ]
      },
      
      demo: {
        title: 'Feature Demo',
        subtitle: 'See how the translator works',
        demoScenario: 'Demo Scenario',
        theirMessage: 'Their message (F-type to T-type):',
        aiTranslationLabel: 'AI Translation (Human Perspective)',
        smartReplySuggestionsLabel: 'Smart Reply Suggestions',
        startUsing: 'Start Using',
        
        exampleInput: '"I don\'t think this decision feels right, something seems off..."',
        exampleTranslation: '"They are actually expressing dissatisfaction diplomatically, possibly feeling the decision isn\'t thorough or overlooked important factors. They worry direct criticism might harm relationships, so they use vague expressions to hint at reconsidering."',
        exampleReplies: [
          'Okay, let me take another look',
          'You\'re right, let\'s discuss what specifically needs adjustment',
          'Thanks for the reminder, there is indeed room for improvement. What do you think the main issues are?'
        ]
      },
      
      complete: {
        title: 'All Set!',
        subtitle: 'You can now start using the T/F Communication Translator. Remember, better communication starts with understanding!',
        usageTips: 'Usage Tips:',
        startTranslating: 'Start Translating',
        
        tips: [
          'Enter their exact words, AI will help you understand the real meaning',
          'Choose the right type combination for more accurate translation',
          'Refer to AI reply suggestions, but adapt them to specific situations'
        ]
      },
      
      common: {
        skip: 'Skip',
        typeThinking: 'T-Type (Thinking)',
        typeFeeling: 'F-Type (Feeling)'
      }
    }
  }
};

// 检测用户地理位置来决定默认语言
export function detectLanguage(): Language {
  // 首先检查localStorage中的用户偏好
  const saved = localStorage.getItem('tf-translator-language') as Language;
  if (saved && (saved === 'zh' || saved === 'en')) {
    return saved;
  }

  // 检查浏览器语言设置
  const browserLang = navigator.language.toLowerCase();
  
  // 中文相关的语言代码
  const chineseLocales = ['zh', 'zh-cn', 'zh-tw', 'zh-hk', 'zh-sg'];
  if (chineseLocales.some(locale => browserLang.startsWith(locale))) {
    return 'zh';
  }

  // 尝试通过时区粗略判断地区
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const chineseTimezones = [
    'Asia/Shanghai', 
    'Asia/Hong_Kong', 
    'Asia/Taipei', 
    'Asia/Macau'
  ];
  
  if (chineseTimezones.includes(timezone)) {
    return 'zh';
  }

  // 默认返回英语
  return 'en';
}

export function saveLanguage(language: Language): void {
  localStorage.setItem('tf-translator-language', language);
} 
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
    feeling: '情感'
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
    feeling: 'Feeling'
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
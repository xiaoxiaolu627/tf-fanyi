export const API_CONFIG = {
  DEEPSEEK_API_KEY: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
  DEEPSEEK_BASE_URL: 'https://api.deepseek.com',
  MODEL_NAME: 'deepseek-chat'
} as const;

export interface TranslationRequest {
  message: string;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
  language?: 'zh' | 'en';
}

export interface TranslationResponse {
  translation: string;
  suggestions: string[];
} 
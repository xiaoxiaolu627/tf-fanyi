export const API_CONFIG = {
  DEEPSEEK_API_KEY: 'sk-12ac7ba82bb3416d828af262d5c82488',
  DEEPSEEK_BASE_URL: 'https://api.deepseek.com',
  MODEL_NAME: 'deepseek-chat'
} as const;

export interface TranslationRequest {
  message: string;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
}

export interface TranslationResponse {
  translation: string;
  suggestions: string[];
} 
import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { Logo } from './components/Logo';
import { TypeSelector } from './components/TypeSelector';
import { MessageInput } from './components/MessageInput';
import { TranslationResult } from './components/TranslationResult';
import { ReplySuggestions } from './components/ReplySuggestions';
import { ConversationHistory } from './components/ConversationHistory';
import { UsageGuide } from './components/UsageGuide';
import { NetworkStatus } from './components/NetworkStatus';
import { LanguageSelector } from './components/LanguageSelector';
import { translateMessage } from './services/deepseekApi';
import type { TranslationResponse } from './config/api';
import { Language, translations, detectLanguage, saveLanguage } from './config/i18n';

interface ConversationItem {
  id: string;
  originalMessage: string;
  translation: string;
  suggestions: string[];
  timestamp: Date;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
}

function App() {
  const [language, setLanguage] = useState<Language>('zh');
  const [selfType, setSelfType] = useState<'T' | 'F'>('T');
  const [targetType, setTargetType] = useState<'T' | 'F'>('F');
  const [message, setMessage] = useState('');
  const [translation, setTranslation] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [error, setError] = useState<string>('');

  // 初始化语言设置
  useEffect(() => {
    const detectedLanguage = detectLanguage();
    setLanguage(detectedLanguage);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    saveLanguage(newLanguage);
  };

  const t = translations[language];

  const handleTranslate = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const result: TranslationResponse = await translateMessage({
        message: message.trim(),
        selfType,
        targetType,
        language
      });
      
      setTranslation(result.translation);
      setSuggestions(result.suggestions);
      
      // Add to conversation history
      const newConversation: ConversationItem = {
        id: Date.now().toString(),
        originalMessage: message,
        translation: result.translation,
        suggestions: result.suggestions,
        timestamp: new Date(),
        selfType,
        targetType,
      };
      
      setConversations(prev => [newConversation, ...prev].slice(0, 10));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.errorMessage;
      setError(errorMessage);
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessage('');
    setTranslation('');
    setSuggestions([]);
  };

  const handleClearHistory = () => {
    setConversations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {t.subtitle}
                  <Sparkles size={14} className="inline ml-1 text-yellow-400" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={handleLanguageChange}
              />
              <button
                onClick={handleReset}
                className="group flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-all duration-300 hover:bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50"
              >
                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                {t.reset}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <h2 className="text-lg font-semibold text-gray-200 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full"></div>
                {t.typeSettings}
              </h2>
              <div className="space-y-6">
                <TypeSelector
                  label={t.myType}
                  selectedType={selfType}
                  onTypeChange={setSelfType}
                  language={language}
                />
                <TypeSelector
                  label={t.targetType}
                  selectedType={targetType}
                  onTypeChange={setTargetType}
                  language={language}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <MessageInput
                message={message}
                onMessageChange={setMessage}
                onSubmit={handleTranslate}
                isLoading={isLoading}
                language={language}
              />
            </div>

            {/* 桌面端显示对话历史 */}
            <div className="hidden lg:block bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <ConversationHistory
                conversations={conversations}
                onClear={handleClearHistory}
              />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <TranslationResult
                originalMessage={message}
                translation={translation}
                isLoading={isLoading}
                selfType={selfType}
                targetType={targetType}
                error={error}
              />
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <ReplySuggestions
                suggestions={suggestions}
                isLoading={isLoading}
                targetType={targetType}
              />
            </div>

            {/* 移动端显示对话历史 - 在智能回复建议下方 */}
            <div className="lg:hidden bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <ConversationHistory
                conversations={conversations}
                onClear={handleClearHistory}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
              <p className="text-sm text-gray-400">
                {t.footerText}
              </p>
              <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500">
              {t.poweredBy} <a href="https://api-docs.deepseek.com/zh-cn/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">DeepSeek AI</a> {language === 'zh' ? '的实时翻译和回复建议' : 'real-time translation and reply suggestions'} • {t.bridgeCommunication}
            </p>
            {conversations.length > 0 && (
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span>{t.sessionStats}: {conversations.length} {t.translationsCount}</span>
                <span>•</span>
                <span>{t.lastUpdate}: {conversations[0]?.timestamp.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>
      </footer>

        {/* 使用指南 */}
        <UsageGuide />

        {/* 网络状态检测 */}
        <NetworkStatus />

        <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #f59e0b);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #d97706);
        }
      `}</style>
    </div>
  );
}

export default App;
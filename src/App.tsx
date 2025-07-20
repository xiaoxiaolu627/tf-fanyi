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
import { UserOnboarding } from './components/UserOnboarding';
import { ShareModal } from './components/ShareModal';
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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // 初始化设置
  useEffect(() => {
    const detectedLanguage = detectLanguage();
    setLanguage(detectedLanguage);

    // 检查是否需要显示引导流程
    const hasCompletedOnboarding = localStorage.getItem('tf-translator-onboarding-completed');
    const savedUserType = localStorage.getItem('tf-translator-user-type') as 'T' | 'F';
    
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else if (savedUserType) {
      setSelfType(savedUserType);
    }
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    saveLanguage(newLanguage);
  };

  const handleOnboardingComplete = (userType: 'T' | 'F') => {
    setSelfType(userType);
    setShowOnboarding(false);
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
    setError('');
  };

  const handleClearHistory = () => {
    setConversations([]);
  };

  // 分享功能
  const handleShare = () => {
    if (translation && message) {
      setShowShareModal(true);
    }
  };

  // 如果需要显示引导流程，则显示引导组件
  if (showOnboarding) {
    return <UserOnboarding language={language} onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTE1MjMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Header */}
      <header className="relative border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* 第一行：Logo和控制按钮 */}
          <div className="flex items-center justify-between mb-4">
            <Logo language={language} showText={false} />
            <div className="flex items-center gap-4">
              <LanguageSelector currentLanguage={language} onLanguageChange={handleLanguageChange} />
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-700/50"
              >
                <RefreshCw size={16} />
                <span className="hidden sm:inline">{t.reset}</span>
              </button>
            </div>
          </div>
          
          {/* 第二行：主标题居中 */}
          <div className="text-center mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-amber-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
              {t.title}
              <Sparkles size={20} className="text-purple-400 animate-pulse" />
            </h1>
          </div>
        </div>
        
        {/* 第三行：副标题 */}
        <div className="max-w-7xl mx-auto px-4 pb-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </header>

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
                onShare={handleShare}
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

      {/* 分享模态框 */}
      {showShareModal && translation && message && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          language={language}
          shareData={{
            originalMessage: message,
            translation: translation,
            userType: selfType,
            targetType: targetType,
            suggestions: suggestions
          }}
        />
      )}
    </div>
  );
}

export default App;
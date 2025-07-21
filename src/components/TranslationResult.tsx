import React from 'react';
import { ArrowRight, Copy, Check, Sparkles, AlertCircle, Share2 } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface TranslationResultProps {
  originalMessage: string;
  translation: string;
  isLoading: boolean;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
  error?: string;
  onShare?: () => void;
  language: Language;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  originalMessage,
  translation,
  isLoading,
  selfType,
  targetType,
  error,
  onShare,
  language,
}) => {
  const [copied, setCopied] = React.useState(false);
  const t = translations[language];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!originalMessage && !isLoading) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-emerald-400" />
        <h3 className="text-sm font-semibold text-gray-200">{t.translationResult}</h3>
        </div>
        <div className="flex items-center gap-2">
        <div className="text-xs text-gray-500 bg-slate-700/30 px-2 py-1 rounded-full">
          {t.humanPerspective}
          </div>
          {/* 复制按钮 */}
          {translation && !isLoading && (
            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-emerald-400 transition-colors hover:bg-slate-700/30 rounded-lg"
              title={language === 'zh' ? '复制翻译结果' : 'Copy translation result'}
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        {/* 顶部装饰条 */}
        <div className="h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-amber-500"></div>
        
        <div className="p-6 space-y-4">
          {/* 类型转换指示器 */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              targetType === 'T' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                targetType === 'T' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></div>
              {language === 'zh' 
                ? `你的话(${targetType}型视角)` 
                : `Your words (${targetType}-type perspective)`
              }
            </div>
            <ArrowRight size={16} className="text-gray-500" />
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              selfType === 'T' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                selfType === 'T' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></div>
              {language === 'zh' 
                ? `对方理解(${selfType}型视角)` 
                : `Their understanding (${selfType}-type perspective)`
              }
            </div>
          </div>

          {/* 翻译内容 */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-gray-400 ml-2">{t.aiProcessing}</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-medium">{language === 'zh' ? '翻译出错了' : 'Translation Error'}</p>
                <p className="text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600/30">
              <p className="text-gray-200 leading-relaxed">{translation}</p>
            </div>
          )}
        </div>
      </div>

      {/* 独立的分享按钮 */}
      {translation && !isLoading && !error && onShare && (
        <div className="text-center">
          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            <Share2 size={16} />
            {language === 'zh' ? '分享这个翻译结果' : 'Share This Translation'}
          </button>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { ArrowRight, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';

interface TranslationResultProps {
  originalMessage: string;
  translation: string;
  isLoading: boolean;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
  error?: string;
}

export const TranslationResult: React.FC<TranslationResultProps> = ({
  originalMessage,
  translation,
  isLoading,
  selfType,
  targetType,
  error,
}) => {
  const [copied, setCopied] = React.useState(false);

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
          <h3 className="text-sm font-semibold text-gray-200">翻译结果</h3>
        </div>
        <div className="text-xs text-gray-500 bg-slate-700/30 px-2 py-1 rounded-full">
          真人视角解读
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
              {targetType}型视角
            </div>
            
            <div className="flex items-center gap-2">
              <ArrowRight size={16} className="text-purple-400" />
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
              selfType === 'T' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                selfType === 'T' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></div>
              {selfType}型理解
            </div>
          </div>

          {/* 翻译内容 */}
          {error ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <AlertCircle size={16} />
                <span className="font-semibold">翻译出错了</span>
              </div>
              <p className="text-red-300 text-sm">{error}</p>
              <p className="text-gray-400 text-xs mt-2">请检查网络连接或稍后重试</p>
            </div>
          ) : isLoading ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-gray-400 text-sm ml-2">AI正在理解中...</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ) : translation ? (
            <div className="relative bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
              <p className="text-gray-200 leading-relaxed">{translation}</p>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:bg-slate-800/50 rounded-lg"
              >
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
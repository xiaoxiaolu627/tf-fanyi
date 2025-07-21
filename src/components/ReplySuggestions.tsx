import React from 'react';
import { Lightbulb, Copy, Check } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface ReplySuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  targetType: 'T' | 'F';
  language: Language;
}

export const ReplySuggestions: React.FC<ReplySuggestionsProps> = ({
  suggestions,
  isLoading,
  targetType,
  language,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  const t = translations[language];

  const handleCopy = async (text: string, index: number) => {
    // 提取实际的回复话术，去掉括号内的解释
    let cleanText = text;
    
    // 处理包含引号的情况，保留到引号结束
    if (text.includes('「') && text.includes('」')) {
      const start = text.indexOf('「');
      const end = text.indexOf('」');
      cleanText = text.substring(start, end + 1);
    }
    // 处理普通文本，去掉最后的括号解释
    else {
      cleanText = text.replace(/\s*\([^)]*\)\s*$/, '').trim();
    }
    
    await navigator.clipboard.writeText(cleanText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!suggestions.length && !isLoading) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb size={16} className={targetType === 'T' ? 'text-emerald-400' : 'text-amber-400'} />
        <h3 className="text-sm font-semibold text-gray-200">{t.smartReplySuggestions}</h3>
        <div className="text-xs text-gray-500 bg-slate-700/30 px-2 py-1 rounded-full">
          {t.suitableFor}{targetType}{language === 'zh' ? '型' : '-Type'}
        </div>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-gray-400 ml-2">{t.retryTranslation}</span>
            </div>
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* 悬停光效 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-amber-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative p-4">
                <div className="flex justify-between items-start gap-3">
                  {/* 建议编号 */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    targetType === 'T' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <p className="text-gray-200 leading-relaxed flex-1">
                    {suggestion}
                  </p>
                  
                  <button
                    onClick={() => handleCopy(suggestion, index)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 hover:bg-slate-700/50 rounded-lg"
                  >
                    {copiedIndex === index ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { Copy, Check, MessageCircle, Lightbulb } from 'lucide-react';

interface ReplySuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  targetType: 'T' | 'F';
}

export const ReplySuggestions: React.FC<ReplySuggestionsProps> = ({
  suggestions,
  isLoading,
  targetType,
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!suggestions.length && !isLoading) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb size={16} className="text-yellow-400" />
        <h3 className="text-sm font-semibold text-gray-200">
          智能回复建议 
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
            targetType === 'T' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            适合{targetType}型
          </span>
        </h3>
      </div>

      <div className="grid gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 overflow-hidden">
                {/* 加载动画背景 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent animate-pulse"></div>
                <div className="space-y-2 relative">
                  <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 bg-slate-700 rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            ))
          : suggestions.map((suggestion, index) => (
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
            ))}
      </div>
    </div>
  );
};
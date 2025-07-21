import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface ConversationItem {
  id: string;
  originalMessage: string;
  translation: string;
  suggestions: string[];
  timestamp: Date;
  selfType: 'T' | 'F';
  targetType: 'T' | 'F';
}

interface ConversationHistoryProps {
  conversations: ConversationItem[];
  onClear: () => void;
  language: Language;
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  conversations,
  onClear,
  language,
}) => {
  const t = translations[language];

  if (conversations.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-200">{t.conversationHistory}</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">
            {language === 'zh' ? '暂无对话记录' : 'No conversation history'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200">{t.conversationHistory}</h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition-colors hover:bg-slate-700/30 rounded"
        >
          <Trash2 size={12} />
          {t.clear}
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="group relative bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 overflow-hidden"
          >
            {/* 左侧彩色条 */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              conversation.targetType === 'T' 
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' 
                : 'bg-gradient-to-b from-amber-500 to-amber-600'
            }`}></div>
            
            <div className="p-3 pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {conversation.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    conversation.targetType === 'T' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {conversation.targetType}
                  </span>
                  <span className="text-xs text-gray-500">→</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    conversation.selfType === 'T' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {conversation.selfType}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed truncate">
                {conversation.translation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
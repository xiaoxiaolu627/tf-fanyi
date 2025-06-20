import React from 'react';
import { History, Trash2, Clock } from 'lucide-react';

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
}

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  conversations,
  onClear,
}) => {
  if (!conversations.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={16} className="text-purple-400" />
          <h3 className="text-sm font-semibold text-gray-200">对话历史</h3>
        </div>
        <button
          onClick={onClear}
          className="group flex items-center gap-1 px-3 py-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors duration-200 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/20"
        >
          <Trash2 size={12} />
          清空
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
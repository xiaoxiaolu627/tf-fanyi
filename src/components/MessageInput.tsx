import React, { useState } from 'react';
import { Send, Loader2, MessageSquare, Lightbulb } from 'lucide-react';

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  message,
  onMessageChange,
  onSubmit,
  isLoading,
  placeholder = "输入对方的话...",
}) => {
  const [showExamples, setShowExamples] = useState(false);

  const examples = [
    "我觉得这个决定不太好，总感觉哪里不对劲...",
    "这个方案效率不高，我们应该重新考虑实施步骤",
    "你这样说让我很难过，感觉你不理解我的想法",
    "从成本效益角度看，这个投入产出比不合理",
    "我们能不能换个方式？我担心这样会影响团队关系",
    "数据显示这个趋势有问题，建议暂停执行"
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleExampleClick = (example: string) => {
    onMessageChange(example);
    setShowExamples(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-purple-400" />
          <label className="text-sm font-semibold text-gray-200">对方的话</label>
        </div>
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-400 transition-colors duration-200"
        >
          <Lightbulb size={12} />
          示例
        </button>
      </div>

      {/* 示例列表 */}
      {showExamples && (
        <div className="bg-slate-700/30 rounded-lg p-3 space-y-2">
          <p className="text-xs text-gray-400 mb-2">点击使用示例：</p>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="w-full text-left text-sm text-gray-300 hover:text-white p-2 rounded hover:bg-slate-600/30 transition-colors duration-200"
            >
              {example}
            </button>
          ))}
        </div>
      )}
      
      <div className="relative">
        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 focus-within:border-purple-500/50 transition-all duration-300">
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-4 bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none rounded-xl"
            rows={4}
            disabled={isLoading}
          />
          
          {/* 字符计数和发送按钮 */}
          <div className="flex items-center justify-between p-4 pt-0">
            <span className="text-xs text-gray-500">
              {message.length}/500
            </span>
            <button
              onClick={onSubmit}
              disabled={!message.trim() || isLoading}
              className="group relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:shadow-none"
            >
              {/* 按钮光效 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center gap-2">
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                翻译
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
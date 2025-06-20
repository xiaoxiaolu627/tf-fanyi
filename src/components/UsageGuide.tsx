import React, { useState } from 'react';
import { HelpCircle, X, Brain, Heart, MessageSquare, Lightbulb } from 'lucide-react';

export const UsageGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center group z-50"
      >
        <HelpCircle size={20} className="group-hover:scale-110 transition-transform duration-200" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/95 backdrop-blur-xl border-b border-slate-700/50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <HelpCircle size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">使用指南</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 什么是 T/F 类型 */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Brain size={18} className="text-emerald-400" />
              什么是 T/F 类型？
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain size={16} className="text-emerald-400" />
                  <span className="font-semibold text-emerald-300">T型 (思考型)</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 重视逻辑和客观分析</li>
                  <li>• 以事实和数据为导向</li>
                  <li>• 追求效率和准确性</li>
                  <li>• 偏好直接、具体的表达</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={16} className="text-amber-400" />
                  <span className="font-semibold text-amber-300">F型 (情感型)</span>
                </div>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 重视情感和人际和谐</li>
                  <li>• 以价值观和感受为导向</li>
                  <li>• 关注他人的情感需求</li>
                  <li>• 偏好温和、体贴的表达</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 如何使用 */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-purple-400" />
              如何使用翻译器？
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <p className="text-gray-200 font-medium">选择你和对方的类型</p>
                  <p className="text-gray-400 text-sm">在左侧面板选择"我的类型"和"对方类型"</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <p className="text-gray-200 font-medium">输入对方的话</p>
                  <p className="text-gray-400 text-sm">在"对方的话"输入框中输入需要理解的内容</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <p className="text-gray-200 font-medium">获取翻译和建议</p>
                  <p className="text-gray-400 text-sm">AI 会将对方的话翻译成你能理解的方式，并提供回复建议</p>
                </div>
              </div>
            </div>
          </section>

          {/* 示例 */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Lightbulb size={18} className="text-yellow-400" />
              使用示例
            </h3>
            <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
              <div className="text-sm">
                <p className="text-gray-400 mb-1">对方的话 (F型说给T型听)：</p>
                <p className="text-gray-200 italic">"我觉得这个决定不太好，总感觉哪里不对劲..."</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-400 mb-1">AI 翻译（真人视角）：</p>
                <p className="text-gray-200">"对方其实是在委婉地表达不满，可能觉得决定不够周全或忽略了某些重要因素。TA担心直接批评会伤害关系，所以用模糊的表达来暗示需要重新考虑..."</p>
              </div>
            </div>
          </section>

          {/* 技术说明 */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white">技术说明</h3>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                本工具基于 <a href="https://api-docs.deepseek.com/zh-cn/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">DeepSeek AI</a> 大语言模型，
                结合 MBTI 人格理论的 T/F 维度特点，为不同思维模式的人群提供沟通翻译服务。
                所有对话内容仅用于当前会话，不会被永久存储。
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50 p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
          >
            开始使用
          </button>
        </div>
      </div>
    </div>
  );
}; 
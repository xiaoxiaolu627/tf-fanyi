import React, { useState, useEffect } from 'react';
import { ArrowRight, Brain, Heart, MessageSquare, Sparkles, CheckCircle, Star, Users, Lightbulb, Play, SkipForward, X } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface UserOnboardingProps {
  language: Language;
  onComplete: (userType: 'T' | 'F') => void;
}

export const UserOnboarding: React.FC<UserOnboardingProps> = ({ language, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState<'T' | 'F' | null>(null);
  const [answers, setAnswers] = useState<('T' | 'F')[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const t = translations[language];

  const steps = [
    'welcome',
    'personality-test', 
    'demo',
    'complete'
  ];

  useEffect(() => {
    // 开发模式：可以通过URL参数重置引导
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset-onboarding') === 'true') {
      localStorage.removeItem('tf-translator-onboarding-completed');
      localStorage.removeItem('tf-translator-user-type');
    }

    // 检查是否已经完成过引导
    const hasCompletedOnboarding = localStorage.getItem('tf-translator-onboarding-completed');
    if (hasCompletedOnboarding) {
      // 如果已完成，直接跳过引导
      const savedUserType = localStorage.getItem('tf-translator-user-type') as 'T' | 'F';
      if (savedUserType) {
        onComplete(savedUserType);
        return;
      }
    }
  }, [onComplete]);

  const handleStepChange = (newStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
    }, 300);
  };

  const handleAnswerSelect = (answer: 'T' | 'F') => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length === t.onboarding.personalityTest.questions.length) {
      // 计算用户类型
      const tCount = newAnswers.filter(a => a === 'T').length;
      const fCount = newAnswers.filter(a => a === 'F').length;
      const result = tCount > fCount ? 'T' : 'F';
      setUserType(result);
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };

  const handleCompleteOnboarding = () => {
    if (userType) {
      // 保存引导完成状态和用户类型
      localStorage.setItem('tf-translator-onboarding-completed', 'true');
      localStorage.setItem('tf-translator-user-type', userType);
      onComplete(userType);
    }
  };

  const handleSkip = () => {
    // 跳过引导，使用默认类型
    localStorage.setItem('tf-translator-onboarding-completed', 'true');
    localStorage.setItem('tf-translator-user-type', 'T');
    onComplete('T');
  };

  const renderWelcome = () => (
    <div className={`text-center space-y-6 sm:space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
      <div className="space-y-4 sm:space-y-6">
        <div className="mx-auto w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25 animate-pulse">
          <MessageSquare size={24} className="text-white sm:w-12 sm:h-12" />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            {t.onboarding.welcome.title}
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t.onboarding.welcome.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto px-2 sm:px-0">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
          <Brain size={24} className="mx-auto mb-3 sm:mb-6 text-emerald-400 sm:w-10 sm:h-10" />
          <h3 className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">
            {t.onboarding.welcome.understandDifferences}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t.onboarding.welcome.understandDifferencesDesc}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
          <Sparkles size={24} className="mx-auto mb-3 sm:mb-6 text-purple-400 sm:w-10 sm:h-10" />
          <h3 className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">
            {t.onboarding.welcome.aiTranslation}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t.onboarding.welcome.aiTranslationDesc}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 text-center border border-slate-600/30 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 sm:col-span-2 lg:col-span-1">
          <Users size={24} className="mx-auto mb-3 sm:mb-6 text-amber-400 sm:w-10 sm:h-10" />
          <h3 className="text-base sm:text-xl font-semibold text-white mb-2 sm:mb-3">
            {t.onboarding.welcome.improveRelationships}
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t.onboarding.welcome.improveRelationshipsDesc}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
        <button
          onClick={() => handleStepChange(1)}
          className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
        >
          {t.onboarding.welcome.startTest}
          <ArrowRight size={16} className="sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={handleSkip}
          className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 hover:bg-slate-700/30 rounded-xl"
        >
          <SkipForward size={14} className="sm:w-[18px] sm:h-[18px]" />
          {t.onboarding.welcome.skipGuide}
        </button>
      </div>
    </div>
  );

  const renderPersonalityTest = () => {
    const currentQuestion = t.onboarding.personalityTest.questions[answers.length];
    const progress = (answers.length / t.onboarding.personalityTest.questions.length) * 100;

    if (showResults && userType) {
      return (
        <div className={`text-center space-y-6 sm:space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          <div className="space-y-4 sm:space-y-6">
            <div className={`mx-auto w-20 h-20 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
              userType === 'T' 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-emerald-500/25' 
                : 'bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/25'
            }`}>
              {userType === 'T' ? <Brain size={24} className="text-white sm:w-12 sm:h-12" /> : <Heart size={24} className="text-white sm:w-12 sm:h-12" />}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {t.onboarding.personalityTest.testComplete}
            </h2>
            <div className={`inline-block px-4 sm:px-8 py-3 sm:py-4 rounded-2xl border-2 ${
              userType === 'T' 
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                : 'bg-amber-500/20 border-amber-500/50 text-amber-300'
            }`}>
              <span className="text-lg sm:text-2xl font-bold">
                {userType === 'T' 
                  ? (language === 'zh' ? 'T型 (思考型)' : 'T-Type (Thinking)')
                  : (language === 'zh' ? 'F型 (情感型)' : 'F-Type (Feeling)')
                }
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 max-w-3xl mx-auto border border-slate-600/30">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              {language === 'zh' ? '你的特点：' : 'Your Characteristics:'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {(userType === 'T' ? (
                language === 'zh' ? [
                  '重视逻辑和客观分析',
                  '以事实和数据为导向', 
                  '追求效率和准确性',
                  '偏好直接、具体的表达'
                ] : [
                  'Value logic and objective analysis',
                  'Data and fact-oriented',
                  'Pursue efficiency and accuracy', 
                  'Prefer direct, specific expression'
                ]
              ) : (
                language === 'zh' ? [
                  '重视情感和人际和谐',
                  '以价值观和感受为导向',
                  '关注他人的情感需求',
                  '偏好温和、体贴的表达'
                ] : [
                  'Value emotions and interpersonal harmony',
                  'Values and feelings-oriented',
                  'Care about others\' emotional needs',
                  'Prefer gentle, considerate expression'
                ]
              )).map((trait, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-slate-700/30 rounded-lg">
                  <CheckCircle size={16} className={`${userType === 'T' ? 'text-emerald-400' : 'text-amber-400'} sm:w-5 sm:h-5`} />
                  <span className="text-sm sm:text-base text-gray-200">{trait}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleStepChange(2)}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 mx-auto shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            {language === 'zh' ? '体验功能' : 'Try Features'}
            <ArrowRight size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      );
    }

    return (
      <div className={`max-w-4xl mx-auto space-y-6 sm:space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t.onboarding.personalityTest.title}
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
            {t.onboarding.personalityTest.subtitle}
          </p>
          
          {/* 进度条 */}
          <div className="max-w-md mx-auto px-4 sm:px-0">
            <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              {t.onboarding.personalityTest.question} {answers.length + 1} / {t.onboarding.personalityTest.questions.length}
            </p>
          </div>
        </div>

        {currentQuestion && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-10 border border-slate-600/30 mx-2 sm:mx-0">
            <h3 className="text-lg sm:text-2xl font-semibold text-white mb-6 sm:mb-8 text-center leading-relaxed">
              {currentQuestion.question}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option: {text: string; type: 'T' | 'F'}, index: number) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option.type)}
                  className="w-full p-4 sm:p-6 text-left bg-slate-600/20 hover:bg-slate-600/40 rounded-xl transition-all duration-300 text-gray-200 hover:text-white border border-slate-600/30 hover:border-purple-500/50 transform hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-400 flex items-center justify-center mt-0.5 sm:mt-1 ${
                      option.type === 'T' ? 'hover:border-emerald-400' : 'hover:border-amber-400'
                    }`}>
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full opacity-0 transition-opacity duration-200 ${
                        option.type === 'T' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}></div>
                    </div>
                    <span className="text-sm sm:text-lg leading-relaxed">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // renderDemo 和 renderComplete 方法保持不变，只是添加了动画类
  const renderDemo = () => (
    <div className={`max-w-5xl mx-auto space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">
          {language === 'zh' ? '功能演示' : 'Feature Demo'}
        </h2>
        <p className="text-xl text-gray-300">
          {language === 'zh' 
            ? '看看翻译器是如何工作的'
            : 'See how the translator works'
          }
        </p>
      </div>

      {/* 演示场景 */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/30">
        <div className="flex items-center gap-2 mb-6">
          <Play size={20} className="text-purple-400" />
          <span className="text-lg font-semibold text-gray-200">
            {language === 'zh' ? '演示场景' : 'Demo Scenario'}
          </span>
        </div>
        
        {/* 输入示例 */}
        <div className="space-y-6">
          <div className="bg-slate-700/40 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-3">
              {language === 'zh' ? '对方的话 (F型说给T型听):' : 'Their message (F-type to T-type):'}
            </p>
            <p className="text-gray-200 text-lg italic leading-relaxed">
              {language === 'zh' 
                ? '"我觉得这个决定不太好，总感觉哪里不对劲..."'
                : '"I don\'t think this decision feels right, something seems off..."'
              }
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <ArrowRight size={24} className="text-white" />
            </div>
          </div>

          {/* AI翻译结果 */}
          <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 rounded-xl p-6 border border-emerald-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-emerald-400" />
              <span className="text-lg font-semibold text-gray-200">
                {language === 'zh' ? 'AI 翻译 (真人视角)' : 'AI Translation (Human Perspective)'}
              </span>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed">
              {language === 'zh'
                ? '"对方其实是在委婉地表达不满，可能觉得决定不够周全或忽略了某些重要因素。TA担心直接批评会伤害关系，所以用模糊的表达来暗示需要重新考虑。"'
                : '"They are actually expressing dissatisfaction diplomatically, possibly feeling the decision isn\'t thorough or overlooked important factors. They worry direct criticism might harm relationships, so they use vague expressions to hint at reconsidering."'
              }
            </p>
          </div>

          {/* 回复建议 */}
          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb size={20} className="text-purple-400" />
              <span className="text-lg font-semibold text-gray-200">
                {language === 'zh' ? '智能回复建议' : 'Smart Reply Suggestions'}
              </span>
            </div>
            <div className="space-y-3">
              {(language === 'zh' ? [
                '好的，我来重新看看',
                '你说得对，让我们再讨论一下具体哪里需要调整',
                '谢谢提醒，确实这个决定还有改进空间，你觉得主要问题在哪？'
              ] : [
                'Okay, let me take another look',
                'You\'re right, let\'s discuss what specifically needs adjustment',
                'Thanks for the reminder, there is indeed room for improvement. What do you think the main issues are?'
              ]).map((suggestion, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <p className="text-gray-200">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => handleStepChange(3)}
          className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
        >
          {language === 'zh' ? '开始使用' : 'Start Using'}
          <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className={`text-center space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
      <div className="space-y-6">
        <div className="mx-auto w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/25 animate-pulse">
          <CheckCircle size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">
          {language === 'zh' ? '准备就绪！' : 'All Set!'}
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {language === 'zh'
            ? '现在你可以开始使用 T/F 沟通翻译器了。记住，更好的沟通从理解开始！'
            : 'You can now start using the T/F Communication Translator. Remember, better communication starts with understanding!'
          }
        </p>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-slate-600/30">
        <h3 className="text-xl font-semibold text-white mb-6">
          {language === 'zh' ? '使用小贴士：' : 'Usage Tips:'}
        </h3>
        <div className="grid md:grid-cols-1 gap-4">
          {(language === 'zh' ? [
            '输入对方的原话，AI 会帮你理解真实含义',
            '选择正确的类型组合，获得更准确的翻译',
            '参考 AI 的回复建议，但要结合具体情况使用'
          ] : [
            'Enter their exact words, AI will help you understand the real meaning',
            'Choose the right type combination for more accurate translation',
            'Refer to AI reply suggestions, but adapt them to specific situations'
          ]).map((tip, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg">
              <Star size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
              <span className="text-gray-200 leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleCompleteOnboarding}
        className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-500 hover:to-emerald-500 transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
      >
        {language === 'zh' ? '开始翻译' : 'Start Translating'}
        <ArrowRight size={20} />
      </button>
    </div>
  );

  const renderCurrentStep = () => {
    switch (steps[currentStep]) {
      case 'welcome':
        return renderWelcome();
      case 'personality-test':
        return renderPersonalityTest();
      case 'demo':
        return renderDemo();
      case 'complete':
        return renderComplete();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
        {/* 进度指示器 */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-3 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-3">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-1 sm:gap-2">
                  <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                      : 'bg-slate-700 text-gray-400'
                  }`}>
                    {index < currentStep ? <CheckCircle size={12} className="sm:w-4 sm:h-4" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-6 sm:w-12 h-0.5 sm:h-1 rounded-full transition-all duration-300 ${
                      index < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-slate-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors bg-slate-700/30 hover:bg-slate-700/50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
              {language === 'zh' ? '跳过' : 'Skip'}
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4 sm:p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}; 
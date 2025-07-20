import React, { useState } from 'react';
import { UserOnboarding } from './UserOnboarding';
import { Language } from '../config/i18n';

export const OnboardingTestPage: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zh');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [completedType, setCompletedType] = useState<'T' | 'F' | null>(null);

  const handleComplete = (userType: 'T' | 'F') => {
    setCompletedType(userType);
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    localStorage.removeItem('tf-translator-onboarding-completed');
    localStorage.removeItem('tf-translator-user-type');
    setShowOnboarding(true);
    setCompletedType(null);
  };

  if (showOnboarding) {
    return <UserOnboarding language={language} onComplete={handleComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-white">
          {language === 'zh' ? '引导测试完成' : 'Onboarding Test Complete'}
        </h1>
        
        <div className="space-y-4">
          <p className="text-gray-300">
            {language === 'zh' ? `检测到的类型: ${completedType}型` : `Detected Type: ${completedType}-Type`}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
            >
              {language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
            </button>
            
            <button
              onClick={resetOnboarding}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
              {language === 'zh' ? '重新体验引导' : 'Experience Onboarding Again'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
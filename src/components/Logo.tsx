import React from 'react';
import { Sparkles } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface LogoProps {
  language?: Language;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ language = 'zh', showText = true }) => {
  const t = translations[language];

  return (
    <div className="relative flex-shrink-0">
      {/* 外层光环效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-purple-500 to-amber-500 rounded-2xl blur-sm opacity-75 animate-pulse"></div>
      
      {/* 主体logo */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 sm:p-4 rounded-2xl border border-purple-500/30">
        {/* T和F字母设计 */}
        <div className="flex items-center justify-center space-x-1">
          {/* T字母 */}
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <span className="text-white font-bold text-sm sm:text-lg">T</span>
            </div>
            {/* T的光效 */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg blur-md opacity-50 -z-10"></div>
          </div>
          
          {/* 连接线动画 */}
          <div className="flex items-center">
            <div className="w-4 sm:w-6 h-0.5 bg-gradient-to-r from-emerald-400 via-purple-400 to-amber-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full animate-ping"></div>
            <div className="w-4 sm:w-6 h-0.5 bg-gradient-to-r from-amber-400 via-purple-400 to-emerald-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* F字母 */}
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/25">
              <span className="text-white font-bold text-sm sm:text-lg">F</span>
            </div>
            {/* F的光效 */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg blur-md opacity-50 -z-10"></div>
          </div>
        </div>
        
        {/* 底部装饰线 */}
        <div className="mt-1.5 sm:mt-2 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
      </div>
    </div>
  );
};
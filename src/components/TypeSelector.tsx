import React from 'react';
import { Brain, Heart, Zap } from 'lucide-react';
import { Language, translations } from '../config/i18n';

interface TypeSelectorProps {
  label: string;
  selectedType: 'T' | 'F';
  onTypeChange: (type: 'T' | 'F') => void;
  language: Language;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({
  label,
  selectedType,
  onTypeChange,
  language,
}) => {
  const t = translations[language];
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
        <Zap size={14} className="text-emerald-400" />
        {label}
      </label>
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
        {/* 滑动背景 */}
        <div 
          className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r transition-all duration-300 ease-out rounded-lg ${
            selectedType === 'T' 
              ? 'left-1 from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30' 
              : 'left-1/2 from-amber-500/20 to-amber-600/20 border border-amber-500/30'
          }`}
        />
        
        <div className="relative flex">
          <button
            onClick={() => onTypeChange('T')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
              selectedType === 'T'
                ? 'text-emerald-300 shadow-lg shadow-emerald-500/10'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Brain size={16} className={selectedType === 'T' ? 'text-emerald-400' : 'text-gray-500'} />
            {t.tType}
          </button>
          <button
            onClick={() => onTypeChange('F')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
              selectedType === 'F'
                ? 'text-amber-300 shadow-lg shadow-amber-500/10'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Heart size={16} className={selectedType === 'F' ? 'text-amber-400' : 'text-gray-500'} />
            {t.fType}
          </button>
        </div>
      </div>
    </div>
  );
};
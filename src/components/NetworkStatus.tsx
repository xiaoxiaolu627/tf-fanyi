import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 检测是否在国内网络环境
    const checkNetworkEnvironment = async () => {
      try {
        // 尝试访问一个国外服务来判断网络环境
        const response = await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        // 如果能快速访问，说明网络环境较好
      } catch (error) {
        // 访问困难，可能在国内网络环境
        setShowTip(true);
      }
    };

    // 延迟检测，避免影响页面加载
    setTimeout(checkNetworkEnvironment, 3000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 bg-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
        <WifiOff size={16} />
        <span className="text-sm">网络连接已断开</span>
      </div>
    );
  }

  if (showTip) {
    return (
      <div className="fixed top-4 right-4 bg-amber-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-start gap-2">
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">网络提示</p>
            <p className="text-xs opacity-90">
              Vercel 在国内可能需要科学上网才能正常访问。如需稳定使用，建议联系开发者获取国内版本。
            </p>
          </div>
          <button
            onClick={() => setShowTip(false)}
            className="ml-2 text-white/80 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return null;
}; 
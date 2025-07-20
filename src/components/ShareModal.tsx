import React, { useState, useRef } from 'react';
import { X, Download, Copy, Check, MessageCircle } from 'lucide-react';
import { Language, translations } from '../config/i18n';
import QRCode from 'qrcode';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  shareData: {
    originalMessage: string;
    translation: string;
    userType: 'T' | 'F';
    targetType: 'T' | 'F';
    suggestions: string[];
  };
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language,
  shareData
}) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = translations[language];

  if (!isOpen) return null;

  // 生成分享文案
  const generateShareText = () => {
    const { originalMessage, translation, userType, targetType } = shareData;
    
    if (language === 'zh') {
      return `🔥 这个AI翻译太准了！

💬 ${userType}型说："${originalMessage}"

🤖 AI解读：${translation}

试试你的沟通风格 👉 tffanyi.online`;
    } else {
      return `🔥 This AI translation is so accurate!

💬 ${userType}-type said: "${originalMessage}"

🤖 AI interpretation: ${translation}

Try your communication style 👉 tffanyi.online`;
    }
  };

  // 生成二维码
  const generateQRCode = async (): Promise<string> => {
    try {
      const qrDataURL = await QRCode.toDataURL('https://tffanyi.online', {
        width: 200,
        margin: 2,
        color: {
          dark: '#1e1b4b',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      return qrDataURL;
    } catch (err) {
      console.error('生成二维码失败:', err);
      return '';
    }
  };

  // 生成高级分享卡片
  const generateShareImage = async (): Promise<string | null> => {
    try {
      console.log('=== 开始生成分享卡片 ===');
      console.log('分享数据:', shareData);
      
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1600;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        console.error('无法获取canvas上下文');
        return null;
      }

      console.log('Canvas创建成功，尺寸:', canvas.width, 'x', canvas.height);

      // 清空画布并设置深色背景
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log('背景绘制完成');

      // 标题区域
      const titleY = 120;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 68px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('T/F 沟通翻译器', 540, titleY);
      console.log('标题绘制完成');

      // 副标题
      ctx.fillStyle = '#a855f7';
      ctx.font = '34px Arial';
      ctx.fillText('AI驱动的沟通风格转换', 540, titleY + 60);
      console.log('副标题绘制完成');

      // T型 → F型显示
      const typeIndicatorY = titleY + 140;
      ctx.font = 'bold 52px Arial';
      ctx.textAlign = 'center';
      
      // 源类型
      ctx.fillStyle = shareData.userType === 'T' ? '#10b981' : '#f59e0b';
      ctx.fillText(shareData.userType + '型', 320, typeIndicatorY);
      console.log('源类型绘制完成:', shareData.userType + '型');
      
      // 箭头
      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 48px Arial';
      ctx.fillText('→', 540, typeIndicatorY);
      console.log('箭头绘制完成');
      
      // 目标类型
      ctx.fillStyle = shareData.targetType === 'T' ? '#10b981' : '#f59e0b';
      ctx.font = 'bold 52px Arial';
      ctx.fillText(shareData.targetType + '型', 760, typeIndicatorY);
      console.log('目标类型绘制完成:', shareData.targetType + '型');

      // 原始消息区域 - 优化位置和尺寸
      const messageY = typeIndicatorY + 80;
      console.log('开始绘制原始消息区域...');
      
      // 深色背景框 - 增加圆角效果
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      ctx.beginPath();
      ctx.roundRect(60, messageY, 960, 160, 16);
      ctx.fill();
      console.log('原始消息背景绘制完成');
      
      // 原始消息标题
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('💬 原话', 100, messageY + 45);
      console.log('原始消息标题绘制完成');
      
      // 原始消息内容
      if (shareData.originalMessage && shareData.originalMessage.trim()) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'left';
        const originalText = shareData.originalMessage.substring(0, 28); // 适当增加字符数
        console.log('即将绘制原始消息:', originalText);
        ctx.fillText(originalText, 100, messageY + 100);
        console.log('原始消息内容绘制完成，位置:', 100, messageY + 100);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('暂无内容', 100, messageY + 100);
        console.log('原始消息占位符绘制完成');
      }

      // AI翻译区域 - 优化位置和尺寸
      const translationY = messageY + 200;
      console.log('开始绘制翻译区域...');
      
      // 深绿色背景框
      ctx.fillStyle = 'rgba(5, 46, 22, 0.9)';
      ctx.beginPath();
      ctx.roundRect(60, translationY, 960, 220, 16);
      ctx.fill();
      console.log('翻译背景绘制完成');
      
      // AI翻译标题
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('🤖 AI解读', 100, translationY + 45);
      console.log('翻译标题绘制完成');
      
      // AI翻译内容 - 优化分行逻辑
      if (shareData.translation && shareData.translation.trim()) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        
        const translationText = shareData.translation;
        console.log('翻译原文:', translationText);
        
        // 优化分行，每行最多30个字符，确保在框内
        const line1 = translationText.substring(0, 30);
        const line2 = translationText.substring(30, 60);
        const line3 = translationText.substring(60, 90);
        const line4 = translationText.substring(90, 120);
        
        console.log('翻译第1行:', line1);
        ctx.fillText(line1, 100, translationY + 85);
        
        if (line2) {
          console.log('翻译第2行:', line2);
          ctx.fillText(line2, 100, translationY + 115);
        }
        
        if (line3) {
          console.log('翻译第3行:', line3);
          ctx.fillText(line3, 100, translationY + 145);
        }
        
        if (line4) {
          console.log('翻译第4行:', line4);
          ctx.fillText(line4.substring(0, 27) + '...', 100, translationY + 175);
        }
        
        console.log('翻译内容绘制完成');
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('暂无翻译内容', 100, translationY + 100);
        console.log('翻译占位符绘制完成');
      }

      // 底部二维码和网址信息区域
      const footerY = translationY + 260; // 在翻译区域下方留出适当间距
      
      // 尝试生成并绘制二维码
      console.log('开始生成二维码...');
      try {
        const qrDataURL = await generateQRCode();
        if (qrDataURL) {
          console.log('二维码生成成功，开始绘制...');
          return new Promise<string>((resolve) => {
            const qrImg = new Image();
            qrImg.onload = () => {
              // 二维码区域
              const qrY = footerY + 40;
              const qrSize = 140;
              const qrX = 540 - qrSize / 2;

              // 二维码标题
              ctx.fillStyle = '#a855f7';
              ctx.font = 'bold 28px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('📱 扫码访问', 540, footerY + 20);
              console.log('二维码标题绘制完成');

              // 绘制二维码白色背景
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.roundRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 12);
              ctx.fill();
              console.log('二维码背景绘制完成');

              // 绘制二维码
              ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
              console.log('二维码绘制完成');

              // 网址和提示文字区域
              const urlY = qrY + qrSize + 50;
              
              // 网址文本
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 36px Arial';
              ctx.fillText('tffanyi.online', 540, urlY);
              console.log('网址绘制完成');

              // 提示文字
              ctx.fillStyle = '#94a3b8';
              ctx.font = '22px Arial';
              ctx.fillText('💻 电脑端可直接点击访问', 540, urlY + 35);
              console.log('提示文字绘制完成');

              // 底部标语
              ctx.fillStyle = '#64748b';
              ctx.font = '20px Arial';
              ctx.fillText('让沟通更有效，让关系更和谐', 540, urlY + 70);
              console.log('底部标语绘制完成');

              console.log('=== 分享卡片生成完成（含二维码）===');
              resolve(canvas.toDataURL('image/png', 0.9));
            };
            
            qrImg.onerror = () => {
              console.error('二维码图片加载失败');
              // 使用备用方案
              ctx.fillStyle = '#ffffff';
              ctx.font = 'bold 32px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('tffanyi.online', 540, footerY + 80);
              
              ctx.fillStyle = '#94a3b8';
              ctx.font = '24px Arial';
              ctx.fillText('让沟通更有效，让关系更和谐', 540, footerY + 130);
              
              console.log('=== 分享卡片生成完成（备用方案）===');
              resolve(canvas.toDataURL('image/png', 0.9));
            };
            
            qrImg.src = qrDataURL;
          });
        }
      } catch (error) {
        console.error('二维码生成失败:', error);
      }

      // 如果二维码生成失败，使用备用方案（不含二维码）
      console.log('使用备用方案，不含二维码...');
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('tffanyi.online', 540, footerY + 80);
      console.log('网址绘制完成');
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px Arial';
      ctx.fillText('让沟通更有效，让关系更和谐', 540, footerY + 130);
      console.log('底部标语绘制完成');

      console.log('=== 分享卡片生成完成 ===');
      return canvas.toDataURL('image/png', 0.9);

    } catch (error) {
      console.error('生成分享卡片时出错:', error);
      return null;
    }
  };

  // 文本换行辅助函数
  const wrapText = (context: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number) => {
    const words = text.split('');
    const lines: string[] = [];
    let currentLine = '';

    for (const char of words) {
      const testLine = currentLine + char;
      const metrics = context.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  // 复制分享链接到剪贴板
  const handleCopyLink = async () => {
    const shareText = `${shareData.originalMessage}\n\n🤖 AI解读：\n${shareData.translation}\n\n来自 T/F 沟通翻译器 - tffanyi.online\n让沟通更有效，让关系更和谐`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后恢复
    } catch (error) {
      console.error('复制失败:', error);
      // 备用方案：创建临时文本区域
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('备用复制方案也失败:', fallbackError);
        alert(language === 'zh' ? '复制失败，请手动复制内容' : 'Copy failed, please copy manually');
      }
      document.body.removeChild(textArea);
    }
  };

  // 下载图片
  const handleDownload = async () => {
    const imageData = await generateShareImage();
    if (imageData) {
      const link = document.createElement('a');
      link.download = 'tf-communication-translation.png';
      link.href = imageData;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MessageCircle size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {language === 'zh' ? '分享翻译结果' : 'Share Translation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
          >
            <X size={20} />
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 预览卡片 */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-xl p-4 border border-slate-600/30">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">
              {language === 'zh' ? '分享预览' : 'Share Preview'}
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-4 text-sm space-y-3">
              <div className="flex items-center gap-2">
                <div className="text-purple-400 font-semibold">
                  {shareData.userType}型 → {shareData.targetType}型
                </div>
              </div>
              <div className="text-gray-300">
                💬 "{shareData.originalMessage}"
              </div>
              <div className="text-emerald-400 text-xs leading-relaxed">
                🤖 {shareData.translation}
              </div>
            </div>
          </div>

          {/* 分享操作 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300">
              {language === 'zh' ? '分享方式' : 'Share Options'}
            </h3>
            
            <div className="space-y-3">
              {/* 复制文本 */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 rounded-xl transition-all duration-300 border border-blue-500/30 group"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-blue-400" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">
                    {copied ? (language === 'zh' ? '已复制到剪贴板' : 'Copied to Clipboard') : (language === 'zh' ? '复制分享文本' : 'Copy Share Text')}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === 'zh' ? '复制后可粘贴到任何地方分享' : 'Copy and paste anywhere to share'}
                  </div>
                </div>
              </button>

              {/* 下载图片 */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl transition-all duration-300 border border-purple-500/30 group"
              >
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Download size={18} className="text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">
                    {language === 'zh' ? '下载精美卡片' : 'Download Beautiful Card'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {language === 'zh' ? '包含二维码，方便手机扫码访问' : 'Includes QR code for easy mobile access'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 微信分享提示 */}
          <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-0.5">
                <MessageCircle size={16} className="text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-green-300 mb-1">
                  {language === 'zh' ? '💬 微信分享' : '💬 WeChat Share'}
                </h4>
                <p className="text-xs text-green-200/80 leading-relaxed">
                  {language === 'zh' 
                    ? '点击"复制分享文本"或"下载精美卡片"，然后打开微信粘贴或发送图片给朋友。图片包含二维码，朋友可直接扫码访问网站'
                    : 'Click "Copy Share Text" or "Download Beautiful Card", then open WeChat and paste or send the image to friends. The image includes a QR code for direct website access'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 隐藏的canvas用于生成图片 */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}; 
#!/bin/bash

echo "🚀 开始部署 T/F 沟通翻译器到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 安装 Vercel CLI..."
    npm install -g vercel
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
echo ""
echo "⚠️  重要提醒："
echo "1. 请在 Vercel 项目设置中添加环境变量："
echo "   VITE_DEEPSEEK_API_KEY = 你的API密钥"
echo ""
echo "2. 添加环境变量后，请重新部署："
echo "   vercel --prod"
echo ""
echo "3. 国内用户访问 Vercel 相对稳定，推荐使用！" 
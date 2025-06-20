# 🚀 T/F 沟通翻译器部署指南

## 📋 部署前准备

### 1. 获取 DeepSeek API 密钥
- 访问 [DeepSeek 平台](https://platform.deepseek.com/api_keys)
- 注册并获取 API 密钥
- 密钥格式：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. 本地开发环境
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑 .env.local，填入真实的 API 密钥
VITE_DEEPSEEK_API_KEY=你的真实API密钥
```

## 🌐 Netlify 部署步骤

### 方法一：拖拽部署
1. 构建项目：
   ```bash
   npm run build
   ```

2. 打开 [Netlify](https://app.netlify.com/)

3. 将 `dist` 文件夹直接拖拽到 Netlify 部署区域

4. **重要**：在 Netlify 设置中添加环境变量
   - 进入 Site settings > Environment variables
   - 添加：`VITE_DEEPSEEK_API_KEY` = `你的API密钥`

### 方法二：GitHub 连接部署
1. 将代码推送到 GitHub 仓库：
   ```bash
   git add .
   git commit -m "安全修复：移除硬编码API密钥"
   git push origin main
   ```

2. 在 Netlify 中连接 GitHub 仓库

3. 在 Build settings 中设置：
   - Build command: `npm run build`
   - Publish directory: `dist`

4. 在 Environment variables 中添加：
   - `VITE_DEEPSEEK_API_KEY` = `你的API密钥`

## ⚡ Vercel 部署步骤

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 登录并部署：
   ```bash
   vercel login
   vercel --prod
   ```

3. 设置环境变量：
   ```bash
   vercel env add VITE_DEEPSEEK_API_KEY
   # 输入你的 API 密钥
   ```

## 🔒 安全最佳实践

### ✅ 正确做法
- ✅ 使用环境变量存储 API 密钥
- ✅ 将 `.env.local` 添加到 `.gitignore`
- ✅ 在部署平台的环境变量中配置密钥
- ✅ 定期轮换 API 密钥

### ❌ 避免做法
- ❌ 在代码中硬编码 API 密钥
- ❌ 将包含密钥的文件提交到代码仓库
- ❌ 在公开场所分享包含密钥的代码
- ❌ 使用过于宽泛的 API 权限

## 🔍 验证部署

部署成功后，可以通过以下方式验证：
1. 访问部署的网址
2. 尝试翻译功能
3. 检查浏览器控制台是否有 API 相关错误

## 🆘 常见问题

**Q: 部署后显示"API 密钥未配置"？**
A: 检查部署平台的环境变量是否正确设置了 `VITE_DEEPSEEK_API_KEY`

**Q: API 调用失败？**
A: 
1. 检查 API 密钥是否有效
2. 检查网络连接
3. 验证 DeepSeek API 额度是否充足

**Q: 本地开发正常，部署后不工作？**
A: 确保部署平台的环境变量与本地 `.env.local` 中的配置一致 
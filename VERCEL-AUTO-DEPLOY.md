# Vercel 自动部署设置指南

## 概述

这个指南将帮助您设置 GitHub Actions 自动部署到 Vercel，实现代码推送后自动更新部署。

## 设置步骤

### 1. 获取 Vercel Token

1. 访问 [Vercel Dashboard](https://vercel.com/account/tokens)
2. 点击 "Create Token"
3. 输入 Token 名称（如：`tf-fanyi-deploy`）
4. 选择适当的过期时间
5. 复制生成的 Token（格式类似：`xxxxxxxxxx`）

### 2. 获取 Vercel 项目信息

1. 在您的项目根目录运行：
   ```bash
   npx vercel link
   ```
   
2. 选择您的项目（tf-fanyi）

3. 运行以下命令获取项目 ID：
   ```bash
   npx vercel project ls
   ```
   
4. 获取组织 ID：
   ```bash
   npx vercel teams ls
   ```

### 3. 在 GitHub 设置 Secrets

1. 访问您的 GitHub 仓库：`https://github.com/YOUR_USERNAME/tf-fanyi`
2. 点击 "Settings" 标签
3. 在左侧菜单选择 "Secrets and variables" → "Actions"
4. 点击 "New repository secret" 添加以下 secrets：

   - **VERCEL_TOKEN**: 步骤1中获取的 Vercel Token
   - **ORG_ID**: 您的 Vercel 组织/团队 ID
   - **PROJECT_ID**: 您的 Vercel 项目 ID
   - **VITE_DEEPSEEK_API_KEY**: 您的 DeepSeek API 密钥

### 4. 测试自动部署

1. 对代码进行任何小修改
2. 提交并推送到 main 分支：
   ```bash
   git add .
   git commit -m "test: 测试自动部署"
   git push origin main
   ```
   
3. 访问 GitHub 仓库的 "Actions" 标签查看部署进度
4. 部署完成后，您的网站将自动更新

## 工作流程说明

- **触发条件**: 推送到 main 分支或创建 Pull Request
- **部署环境**: 生产环境（--prod 参数）
- **环境变量**: 自动注入 DeepSeek API 密钥
- **构建缓存**: 使用 npm 缓存加速构建

## 故障排除

### 常见问题

1. **部署失败**: 检查 GitHub Actions 日志，确认所有 Secrets 已正确设置
2. **API 密钥错误**: 确认 `VITE_DEEPSEEK_API_KEY` 在 GitHub Secrets 中设置正确
3. **权限问题**: 确认 Vercel Token 有足够权限访问项目

### 获取帮助

如果遇到问题，可以：
1. 查看 GitHub Actions 运行日志
2. 检查 Vercel 部署日志
3. 确认所有必需的 Secrets 都已设置

## 备用方案

如果 Vercel 自动部署出现问题，您仍可以：
1. 手动运行 `npm run build && npx vercel --prod`
2. 使用 GitHub Pages 部署（在 Actions 标签手动触发）

---

设置完成后，每次您推送代码到 main 分支，项目都会自动重新部署到 Vercel！ 
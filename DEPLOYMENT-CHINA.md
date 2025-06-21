# 🇨🇳 国内用户部署指南

## 🎯 推荐平台（国内访问友好）

### 1. 🚀 Vercel（推荐）
**优点**：
- ✅ 国内访问相对稳定
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 免费额度充足

**部署步骤**：
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录（选择 GitHub 登录）
vercel login

# 部署
vercel --prod

# 设置环境变量
vercel env add VITE_DEEPSEEK_API_KEY
# 输入你的真实 API 密钥
```

### 2. 🌐 GitHub Pages + Actions
**优点**：
- ✅ 完全免费
- ✅ 国内访问较稳定
- ✅ 与 GitHub 集成

**部署步骤**：
1. 创建 GitHub 仓库
2. 配置 GitHub Actions 自动部署
3. 在仓库 Settings > Secrets 中添加 API 密钥

### 3. 🇨🇳 国内平台选择

#### 腾讯云静态网站托管
- 国内访问速度快
- 需要实名认证
- 有免费额度

#### 阿里云 OSS + CDN
- 访问速度极快
- 配置相对复杂
- 成本较低

#### Gitee Pages（码云）
- 完全免费
- 国内访问稳定
- 需要实名认证

## 🔧 如果坚持使用 Netlify

### 优化访问速度的方法：

1. **使用自定义域名**
   - 购买域名并配置 CDN
   - 使用国内 DNS 服务商

2. **资源优化**
   ```bash
   # 压缩构建产物
   npm run build
   
   # 检查构建大小
   du -sh dist/*
   ```

3. **添加访问提示**
   让我为应用添加网络检测和提示： 
# 📧 邮箱验证功能配置指南

## 概述

校园二手交易平台已集成完整的邮箱验证功能，包括：
- ✅ 用户注册时自动发送验证邮件
- ✅ 邮箱验证链接验证
- ✅ 重新发送验证邮件
- ✅ 忘记密码邮件重置
- ✅ 美观的HTML邮件模板

## 🚀 快速开始

### 1. 创建环境配置文件

复制 `env.example` 文件为 `.env`：

```bash
cp env.example .env
```

### 2. 配置邮件服务

编辑 `.env` 文件，配置您的邮件服务：

```env
# 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. 启动服务器

```bash
npm start
```

### 4. 测试邮件功能

打开 `test-email-verification.html` 进行功能测试。

## 📮 邮件服务配置

### Gmail 配置

1. **启用两步验证**
   - 访问 [Google 账户安全设置](https://myaccount.google.com/security)
   - 启用两步验证

2. **生成应用专用密码**
   - 在安全设置中找到"应用专用密码"
   - 生成新密码（16位字符）
   - 使用此密码作为 `SMTP_PASS`

3. **配置示例**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### Outlook/Hotmail 配置

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo 配置

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### 企业邮箱配置

以腾讯企业邮箱为例：
```env
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-password
```

### 第三方邮件服务

#### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

#### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

## 🧪 测试邮件功能

### 1. 配置测试

运行邮件配置测试：
```bash
node test-email.js
```

### 2. 功能测试

打开 `test-email-verification.html` 进行完整功能测试：
- 用户注册测试
- 验证邮件发送测试
- 重新发送验证邮件测试
- 忘记密码功能测试

### 3. 主应用测试

1. 打开 `index.html`
2. 点击"Register"注册新用户
3. 检查邮箱并点击验证链接
4. 验证成功后测试平台功能

## 📋 API 端点

### 认证相关

- `POST /api/auth/register` - 用户注册（自动发送验证邮件）
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `POST /api/auth/logout` - 用户登出

### 邮箱验证相关

- `GET /api/auth/verify-email?token=xxx` - 验证邮箱
- `POST /api/auth/resend-verification` - 重新发送验证邮件
- `POST /api/auth/forgot-password` - 请求密码重置
- `POST /api/auth/reset-password` - 重置密码

## 🎨 邮件模板

系统包含两种精美的HTML邮件模板：

### 1. 邮箱验证邮件
- 渐变背景设计
- 清晰的验证按钮
- 详细的使用说明
- 安全提示信息

### 2. 密码重置邮件
- 红色主题设计
- 醒目的重置按钮
- 安全警告信息
- 过期时间提醒

## 🔧 故障排除

### 常见问题

1. **邮件发送失败**
   - 检查网络连接
   - 验证邮件服务配置
   - 确认应用专用密码正确

2. **Gmail 连接被拒绝**
   - 确保启用了两步验证
   - 使用应用专用密码而非账户密码
   - 检查"安全性较低的应用访问"设置

3. **邮件进入垃圾箱**
   - 添加发件人到联系人
   - 配置SPF/DKIM记录（企业邮箱）
   - 使用专业的邮件服务

4. **验证链接无效**
   - 检查链接是否过期（24小时）
   - 确认链接完整复制
   - 检查服务器时间设置

### 调试模式

启用详细日志：
```env
NODE_ENV=development
```

查看服务器控制台输出获取详细错误信息。

## 📚 技术细节

### 安全特性

- ✅ JWT Token 认证
- ✅ 密码加密存储（bcrypt）
- ✅ 验证链接过期机制
- ✅ 输入验证和清理
- ✅ 错误信息保护

### 数据库字段

用户模型新增字段：
```javascript
emailVerificationToken: String    // 验证Token
emailVerificationExpires: Date    // 验证过期时间
passwordResetToken: String        // 密码重置Token
passwordResetExpires: Date        // 重置过期时间
```

### 邮件服务

- 使用 Nodemailer 库
- 支持多种SMTP服务
- HTML和纯文本双格式
- 自动重试机制

## 🚀 生产环境部署

### 环境变量

生产环境必须配置：
```env
NODE_ENV=production
JWT_SECRET=your-strong-secret-key
BASE_URL=https://your-domain.com
```

### 邮件服务建议

生产环境推荐使用专业邮件服务：
- SendGrid
- Mailgun
- Amazon SES
- 阿里云邮件推送

### 安全配置

1. 使用强密码和复杂JWT密钥
2. 配置HTTPS
3. 设置适当的CORS策略
4. 启用邮件服务的安全功能

## 📞 技术支持

如遇到问题，请检查：
1. 服务器控制台错误日志
2. 邮件服务配置
3. 网络连接状态
4. 邮箱设置和垃圾邮件文件夹

---

**注意：** 本功能需要有效的邮件服务配置才能正常工作。请确保按照上述指南正确配置邮件服务。

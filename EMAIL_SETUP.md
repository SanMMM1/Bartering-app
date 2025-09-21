# 📧 Email Verification Setup Guide

## Overview

Campus Marketplace has integrated complete email verification functionality, including:
- ✅ Automatic verification email on user registration
- ✅ Email verification link validation
- ✅ Resend verification email
- ✅ Forgot password email reset
- ✅ Beautiful HTML email templates

## 🚀 Quick Start

### 1. Create Environment Configuration File

Copy `env.example` file to `.env`:

```bash
cp env.example .env
```

### 2. Configure Email Service

Edit `.env` file and configure your email service:

```env
# Email service configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Start Server

```bash
npm start
```

### 4. Test Email Functionality

Open `test-email-verification.html` to test functionality.

## 📮 Email Service Configuration

### Gmail Configuration

1. **Enable Two-Factor Authentication**
   - Visit [Google Account Security Settings](https://myaccount.google.com/security)
   - Enable two-factor authentication

2. **Generate App-Specific Password**
   - Find "App passwords" in security settings
   - Generate new password (16 characters)
   - Use this password as `SMTP_PASS`

3. **Configuration Example**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### Outlook/Hotmail Configuration

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Configuration

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Enterprise Email Configuration

Using Tencent Enterprise Email as an example:
```env
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-password
```

### Third-Party Email Services

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

## 🧪 Test Email Functionality

### 1. Configuration Test

Run email configuration test:
```bash
node test-email.js
```

### 2. Functionality Test

Open `test-email-verification.html` for complete functionality testing:
- User registration test
- Verification email sending test
- Resend verification email test
- Forgot password functionality test

### 3. Main Application Test

1. Open `index.html`
2. Click "Register" to register new user
3. Check email and click verification link
4. Test platform functionality after successful verification

## 📋 API 端点

### Authentication Related

- `POST /api/auth/register` - User registration (automatically sends verification email)
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user information
- `POST /api/auth/logout` - User logout

### Email Verification Related

- `GET /api/auth/verify-email?token=xxx` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

## 🎨 Email Templates

The system includes two beautiful HTML email templates:

### 1. Email Verification Email
- Gradient background design
- Clear verification button
- Detailed usage instructions
- Security tips

### 2. Password Reset Email
- Red theme design
- Prominent reset button
- Security warning information
- Expiration time reminder

## 🔧 Troubleshooting

### Common Issues

1. **Email sending failed**
   - Check network connection
   - Verify email service configuration
   - Confirm app-specific password is correct

2. **Gmail connection rejected**
   - Ensure two-factor authentication is enabled
   - Use app-specific password instead of account password
   - Check "Less secure app access" settings

3. **Emails going to spam**
   - Add sender to contacts
   - Configure SPF/DKIM records (enterprise email)
   - Use professional email services

4. **Verification link invalid**
   - Check if link has expired (24 hours)
   - Confirm link is completely copied
   - Check server time settings

### Debug Mode

Enable detailed logging:
```env
NODE_ENV=development
```

Check server console output for detailed error information.

## 📚 Technical Details

### Security Features

- ✅ JWT Token authentication
- ✅ Password encrypted storage (bcrypt)
- ✅ Verification link expiration mechanism
- ✅ Input validation and sanitization
- ✅ Error message protection

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

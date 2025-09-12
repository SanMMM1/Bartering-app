const nodemailer = require('nodemailer');
const crypto = require('crypto');

// 邮件配置
const emailConfig = {
  // 使用Gmail SMTP服务（开发环境）
  // 生产环境建议使用专业的邮件服务如SendGrid、Mailgun等
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password' // 使用应用专用密码
  }
};

// 创建邮件传输器
const createTransporter = () => {
  return nodemailer.createTransporter(emailConfig);
};

// 生成邮箱验证Token
const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// 生成验证链接
const generateVerificationLink = (token) => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
  return `${baseUrl}/api/auth/verify-email?token=${token}`;
};

// 发送邮箱验证邮件
const sendVerificationEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    const verificationLink = generateVerificationLink(token);
    
    const mailOptions = {
      from: `"校园二手交易平台" <${emailConfig.auth.user}>`,
      to: email,
      subject: '邮箱验证 - 校园二手交易平台',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🎓 校园二手交易平台</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">欢迎加入我们的社区！</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}，</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              感谢您注册校园二手交易平台！为了确保您的账户安全，请点击下面的按钮验证您的邮箱地址：
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationLink}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                ✅ 验证邮箱地址
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              如果按钮无法点击，请复制以下链接到浏览器中打开：<br>
              <a href="${verificationLink}" style="color: #667eea; word-break: break-all;">${verificationLink}</a>
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>⚠️ 重要提示：</strong><br>
                • 此验证链接24小时内有效<br>
                • 如果这不是您的操作，请忽略此邮件<br>
                • 验证后即可正常使用平台所有功能
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
              此邮件由系统自动发送，请勿回复。<br>
              如有问题，请联系客服：support@campus-marketplace.com
            </p>
          </div>
        </div>
      `,
      text: `
        校园二手交易平台 - 邮箱验证
        
        Hi ${name}，
        
        感谢您注册校园二手交易平台！请点击以下链接验证您的邮箱地址：
        
        ${verificationLink}
        
        此验证链接24小时内有效。
        
        如果这不是您的操作，请忽略此邮件。
        
        此邮件由系统自动发送，请勿回复。
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('验证邮件发送成功:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('发送验证邮件失败:', error);
    return { success: false, error: error.message };
  }
};

// 发送密码重置邮件
const sendPasswordResetEmail = async (email, name, token) => {
  try {
    const transporter = createTransporter();
    const resetLink = `${process.env.BASE_URL || 'http://localhost:3001'}/api/auth/reset-password?token=${token}`;
    
    const mailOptions = {
      from: `"校园二手交易平台" <${emailConfig.auth.user}>`,
      to: email,
      subject: '密码重置 - 校园二手交易平台',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🔒 密码重置</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">校园二手交易平台</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}，</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              我们收到了您的密码重置请求。请点击下面的按钮重置您的密码：
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">
                🔑 重置密码
              </a>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404; font-size: 14px;">
                <strong>⚠️ 安全提示：</strong><br>
                • 此重置链接1小时内有效<br>
                • 如果您没有请求重置密码，请忽略此邮件<br>
                • 为保护账户安全，请勿将链接分享给他人
              </p>
            </div>
            
            <p style="color: #999; font-size: 12px; text-align: center; margin: 30px 0 0 0;">
              此邮件由系统自动发送，请勿回复。
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('密码重置邮件发送成功:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('发送密码重置邮件失败:', error);
    return { success: false, error: error.message };
  }
};

// 测试邮件配置
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ 邮件配置验证成功');
    return { success: true };
  } catch (error) {
    console.error('❌ 邮件配置验证失败:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  generateVerificationToken,
  testEmailConfig
};

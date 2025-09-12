const { testEmailConfig, sendVerificationEmail } = require('./services/emailService');

async function testEmail() {
  console.log('🧪 开始测试邮件配置...\n');
  
  // 测试邮件配置
  console.log('1. 测试邮件服务器连接...');
  const configResult = await testEmailConfig();
  
  if (configResult.success) {
    console.log('✅ 邮件服务器连接成功！\n');
    
    // 测试发送验证邮件
    console.log('2. 测试发送验证邮件...');
    const testEmail = 'test@example.com';
    const testName = '测试用户';
    const testToken = 'test-token-123';
    
    const emailResult = await sendVerificationEmail(testEmail, testName, testToken);
    
    if (emailResult.success) {
      console.log('✅ 验证邮件发送成功！');
      console.log(`📧 邮件ID: ${emailResult.messageId}`);
    } else {
      console.log('❌ 验证邮件发送失败:', emailResult.error);
    }
  } else {
    console.log('❌ 邮件服务器连接失败:', configResult.error);
    console.log('\n📝 请检查以下配置：');
    console.log('1. 确保已创建 .env 文件并配置了邮件服务参数');
    console.log('2. 如果使用Gmail，请确保：');
    console.log('   - 启用了两步验证');
    console.log('   - 生成了应用专用密码');
    console.log('   - 使用应用专用密码而不是账户密码');
    console.log('3. 检查网络连接和防火墙设置');
  }
}

// 运行测试
testEmail().catch(console.error);

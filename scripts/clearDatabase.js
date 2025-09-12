const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/campus_marketplace');
    console.log('MongoDB connected for clearing...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// 清除所有数据
const clearDatabase = async () => {
  try {
    console.log('开始清除数据库...');
    
    // 清除所有集合的数据
    await User.deleteMany({});
    console.log('✅ 用户数据已清除');
    
    await Listing.deleteMany({});
    console.log('✅ 商品数据已清除');
    
    await Favorite.deleteMany({});
    console.log('✅ 收藏数据已清除');
    
    await Message.deleteMany({});
    console.log('✅ 消息数据已清除');
    
    console.log('🎉 数据库清除完成！');
    
  } catch (error) {
    console.error('清除数据库错误:', error);
  } finally {
    mongoose.connection.close();
  }
};

// 运行清除脚本
const runClear = async () => {
  await connectDB();
  await clearDatabase();
};

runClear();

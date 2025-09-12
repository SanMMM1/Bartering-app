const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

// 连接数据库
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/campus_marketplace');
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// 生成唯一ID
const uid = () => Math.random().toString(36).slice(2, 10);

// 种子数据
const seedUsers = [
  {
    _id: new mongoose.Types.ObjectId(),
    email: 'alice@example.com',
    password: 'password123',
    name: 'Alice',
    avatar: 'https://i.pravatar.cc/100?img=5',
    phone: '123-456-7890',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: 'ben@example.com', 
    password: 'password123',
    name: 'Ben',
    avatar: 'https://i.pravatar.cc/100?img=13',
    phone: '123-456-7891',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: 'cara@example.com',
    password: 'password123', 
    name: 'Cara',
    avatar: 'https://i.pravatar.cc/100?img=23',
    phone: '123-456-7892',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: 'dan@example.com',
    password: 'password123',
    name: 'Dan', 
    avatar: 'https://i.pravatar.cc/100?img=33',
    phone: '123-456-7893',
    isVerified: true
  },
  {
    _id: new mongoose.Types.ObjectId(),
    email: 'me@example.com',
    password: 'password123',
    name: 'Me',
    avatar: 'https://i.pravatar.cc/100?img=15',
    phone: '123-456-7894',
    isVerified: true
  }
];

const seedListings = [
  {
    title: "iPad Air 5 64GB Blue",
    price: 360,
    category: "Electronics",
    condition: "Like New",
    location: "Cleveland",
    description: "Used for taking notes in class, good battery health, comes with pen case and protective cover.",
    images: ["https://images.unsplash.com/photo-1585793430381-c8ce1a01d7f9?q=80&w=1200&auto=format&fit=crop"],
    seller: {
      id: seedUsers[0]._id.toString(),
      name: seedUsers[0].name,
      avatar: seedUsers[0].avatar
    },
    sold: false,
    createdAt: new Date(Date.now() - 3 * 3600 * 1000)
  },
  {
    title: "IKEA Table & Chair Set",
    price: 40,
    category: "Furniture", 
    condition: "Good",
    location: "Cleveland",
    description: "Graduating soon, minor scratches, pickup preferred.",
    images: ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"],
    seller: {
      id: seedUsers[1]._id.toString(),
      name: seedUsers[1].name,
      avatar: seedUsers[1].avatar
    },
    sold: false,
    createdAt: new Date(Date.now() - 22 * 3600 * 1000)
  },
  {
    title: "Nike Running Shoes Size 9",
    price: 25,
    category: "Sports",
    condition: "Fair", 
    location: "Cleveland",
    description: "Size doesn't fit, already cleaned.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"],
    seller: {
      id: seedUsers[2]._id.toString(),
      name: seedUsers[2].name,
      avatar: seedUsers[2].avatar
    },
    sold: false,
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000)
  },
  {
    title: "Microwave 700W",
    price: 30,
    category: "Appliances",
    condition: "Good",
    location: "Cleveland", 
    description: "Used in dorm, like new condition, comes with tray.",
    images: ["https://images.unsplash.com/photo-1597143720588-4baf4a4b219c?q=80&w=1200&auto=format&fit=crop"],
    seller: {
      id: seedUsers[3]._id.toString(),
      name: seedUsers[3].name,
      avatar: seedUsers[3].avatar
    },
    sold: false,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000)
  }
];

const seedFavorites = [
  {
    user: seedUsers[4]._id, // Me
    listing: null // 将在运行时设置
  }
];

const seedMessages = [
  {
    listing: null, // 将在运行时设置
    sender: seedUsers[4]._id, // Me
    receiver: seedUsers[0]._id, // Alice
    content: "Hi, is the iPad still available?",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000)
  },
  {
    listing: null, // 将在运行时设置
    sender: seedUsers[0]._id, // Alice
    receiver: seedUsers[4]._id, // Me
    content: "Yes, it's still available! When would you like to meet?",
    isRead: true,
    createdAt: new Date(Date.now() - 1.5 * 3600 * 1000)
  },
  {
    listing: null, // 将在运行时设置
    sender: seedUsers[4]._id, // Me
    receiver: seedUsers[0]._id, // Alice
    content: "How about tomorrow afternoon?",
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 3600 * 1000)
  }
];

const seedDatabase = async () => {
  try {
    console.log('开始清理数据库...');
    
    // 清理现有数据
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Favorite.deleteMany({});
    await Message.deleteMany({});
    
    console.log('开始插入用户数据...');
    const users = await User.insertMany(seedUsers);
    console.log(`插入了 ${users.length} 个用户`);
    
    console.log('开始插入商品数据...');
    const listings = await Listing.insertMany(seedListings);
    console.log(`插入了 ${listings.length} 个商品`);
    
    console.log('开始插入收藏数据...');
    // 为第一个商品添加收藏
    const favorite = new Favorite({
      user: seedUsers[4]._id,
      listing: listings[0]._id
    });
    await favorite.save();
    console.log('插入了收藏数据');
    
    console.log('开始插入消息数据...');
    // 为第一个商品添加消息
    const messages = seedMessages.map(msg => ({
      ...msg,
      listing: listings[0]._id
    }));
    await Message.insertMany(messages);
    console.log(`插入了 ${messages.length} 条消息`);
    
    console.log('数据库种子数据插入完成！');
    console.log('\n测试用户账号:');
    console.log('Alice: alice@example.com / password123');
    console.log('Ben: ben@example.com / password123');
    console.log('Cara: cara@example.com / password123');
    console.log('Dan: dan@example.com / password123');
    console.log('Me: me@example.com / password123');
    
  } catch (error) {
    console.error('种子数据插入错误:', error);
  } finally {
    mongoose.connection.close();
  }
};

// 运行种子脚本
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();

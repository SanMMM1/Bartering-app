const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/campus_marketplace');
    console.log('MongoDB connected for clearing...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Clear all data
const clearDatabase = async () => {
  try {
    console.log('Starting database cleanup...');
    
    // Clear all collection data
    await User.deleteMany({});
    console.log('✅ User data cleared');
    
    await Listing.deleteMany({});
    console.log('✅ Product data cleared');
    
    await Favorite.deleteMany({});
    console.log('✅ Favorite data cleared');
    
    await Message.deleteMany({});
    console.log('✅ Message data cleared');
    
    console.log('🎉 Database cleanup completed!');
    
  } catch (error) {
    console.error('Database cleanup error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run cleanup script
const runClear = async () => {
  await connectDB();
  await clearDatabase();
};

runClear();

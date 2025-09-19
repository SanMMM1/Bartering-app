const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Message = require('../models/Message');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/campus_marketplace');
    console.log('MongoDB connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Generate unique ID
const uid = () => Math.random().toString(36).slice(2, 10);

// Seed data
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
    listing: null // Will be set at runtime
  }
];

const seedMessages = [
  {
    listing: null, // Will be set at runtime
    sender: seedUsers[4]._id, // Me
    receiver: seedUsers[0]._id, // Alice
    content: "Hi, is the iPad still available?",
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000)
  },
  {
    listing: null, // Will be set at runtime
    sender: seedUsers[0]._id, // Alice
    receiver: seedUsers[4]._id, // Me
    content: "Yes, it's still available! When would you like to meet?",
    isRead: true,
    createdAt: new Date(Date.now() - 1.5 * 3600 * 1000)
  },
  {
    listing: null, // Will be set at runtime
    sender: seedUsers[4]._id, // Me
    receiver: seedUsers[0]._id, // Alice
    content: "How about tomorrow afternoon?",
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 3600 * 1000)
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database cleanup...');
    
    // Clean existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Favorite.deleteMany({});
    await Message.deleteMany({});
    
    console.log('Starting to insert user data...');
    const users = await User.insertMany(seedUsers);
    console.log(`Inserted ${users.length} users`);
    
    console.log('Starting to insert product data...');
    const listings = await Listing.insertMany(seedListings);
    console.log(`Inserted ${listings.length} products`);
    
    console.log('Starting to insert favorite data...');
    // Add favorite for first product
    const favorite = new Favorite({
      user: seedUsers[4]._id,
      listing: listings[0]._id
    });
    await favorite.save();
    console.log('Inserted favorite data');
    
    console.log('Starting to insert message data...');
    // Add messages for first product
    const messages = seedMessages.map(msg => ({
      ...msg,
      listing: listings[0]._id
    }));
    await Message.insertMany(messages);
    console.log(`Inserted ${messages.length} messages`);
    
    console.log('Database seed data insertion completed!');
    console.log('\nTest user accounts:');
    console.log('Alice: alice@example.com / password123');
    console.log('Ben: ben@example.com / password123');
    console.log('Cara: cara@example.com / password123');
    console.log('Dan: dan@example.com / password123');
    console.log('Me: me@example.com / password123');
    
  } catch (error) {
    console.error('Seed data insertion error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seed script
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();

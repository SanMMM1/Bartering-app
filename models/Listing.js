const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: [
      'Electronics',
      'Appliances', 
      'Furniture',
      'Clothing',
      'Books',
      'Sports',
      'Beauty & Personal Care',
      'Tickets',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: [true, 'Product condition is required'],
    enum: ['Brand New', 'Like New', 'Good', 'Fair']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    enum: [
      'Cleveland',
      'Columbus', 
      'Pittsburgh',
      'Beijing',
      'Shanghai',
      'Guangzhou',
      'Shunyi'
    ]
  },
  images: [{
    type: String,
    required: true
  }],
  seller: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  sold: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes
listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ category: 1 });
listingSchema.index({ location: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ 'seller.id': 1 });

// Automatically set updatedAt on update
listingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Listing', listingSchema);

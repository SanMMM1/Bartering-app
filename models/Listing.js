const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '商品标题不能为空'],
    trim: true,
    maxlength: [100, '标题不能超过100个字符']
  },
  description: {
    type: String,
    required: [true, '商品描述不能为空'],
    trim: true,
    maxlength: [1000, '描述不能超过1000个字符']
  },
  price: {
    type: Number,
    required: [true, '价格不能为空'],
    min: [0, '价格不能为负数']
  },
  category: {
    type: String,
    required: [true, '商品类别不能为空'],
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
    required: [true, '商品成色不能为空'],
    enum: ['Brand New', 'Like New', 'Good', 'Fair']
  },
  location: {
    type: String,
    required: [true, '地点不能为空'],
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

// 创建索引
listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ category: 1 });
listingSchema.index({ location: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ 'seller.id': 1 });

// 更新时自动设置 updatedAt
listingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Listing', listingSchema);

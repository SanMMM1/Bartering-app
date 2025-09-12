const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { body, validationResult } = require('express-validator');

// 获取所有商品列表
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      condition,
      location,
      minPrice,
      maxPrice,
      sort = 'createdAt',
      order = 'desc',
      search,
      sold = false
    } = req.query;

    // 构建查询条件
    const query = { sold: sold === 'true' };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (condition && condition !== 'All') {
      query.condition = condition;
    }
    
    if (location && location !== 'All') {
      query.location = location;
    }
    
    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) };
    }
    
    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) };
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    // 构建排序条件
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // 分页
    const skip = (Number(page) - 1) * Number(limit);

    const listings = await Listing.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const total = await Listing.countDocuments(query);

    res.json({
      success: true,
      data: listings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('获取商品列表错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 获取单个商品详情
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    console.error('获取商品详情错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 创建新商品
router.post('/', [
  body('title').notEmpty().withMessage('商品标题不能为空'),
  body('description').notEmpty().withMessage('商品描述不能为空'),
  body('price').isNumeric().withMessage('价格必须是数字'),
  body('category').isIn([
    'Electronics', 'Appliances', 'Furniture', 'Clothing', 
    'Books', 'Sports', 'Beauty & Personal Care', 'Tickets', 'Other'
  ]).withMessage('无效的商品类别'),
  body('condition').isIn(['Brand New', 'Like New', 'Good', 'Fair'])
    .withMessage('无效的商品成色'),
  body('location').isIn([
    'Cleveland', 'Columbus', 'Pittsburgh', 'Beijing', 
    'Shanghai', 'Guangzhou', 'Shunyi'
  ]).withMessage('无效的地点'),
  body('seller').isObject().withMessage('卖家信息不能为空')
], async (req, res) => {
  try {
    // 验证输入
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: '输入验证失败',
        errors: errors.array()
      });
    }

    const listing = new Listing(req.body);
    await listing.save();

    res.status(201).json({
      success: true,
      data: listing,
      message: '商品创建成功'
    });
  } catch (error) {
    console.error('创建商品错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 更新商品
router.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    res.json({
      success: true,
      data: listing,
      message: '商品更新成功'
    });
  } catch (error) {
    console.error('更新商品错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 删除商品
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    res.json({
      success: true,
      message: '商品删除成功'
    });
  } catch (error) {
    console.error('删除商品错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 标记商品为已售出
router.patch('/:id/sold', async (req, res) => {
  try {
    const { sold } = req.body;
    
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { sold },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: '商品不存在'
      });
    }

    res.json({
      success: true,
      data: listing,
      message: `商品已${sold ? '标记为售出' : '取消售出标记'}`
    });
  } catch (error) {
    console.error('更新商品状态错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

// 获取用户的商品
router.get('/user/:userId', async (req, res) => {
  try {
    const { sold } = req.query;
    const query = { 'seller.id': req.params.userId };
    
    if (sold !== undefined) {
      query.sold = sold === 'true';
    }

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: listings
    });
  } catch (error) {
    console.error('获取用户商品错误:', error);
    res.status(500).json({
      success: false,
      message: '服务器内部错误'
    });
  }
});

module.exports = router;

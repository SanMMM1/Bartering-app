const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { body, validationResult } = require('express-validator');

// Get all product listings
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

    // Build query conditions
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

    // Build sort conditions
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // Pagination
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
    console.error('Get product listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single product details
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    console.error('Get product details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new product
router.post('/', [
  body('title').notEmpty().withMessage('Product title is required'),
  body('description').notEmpty().withMessage('Product description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn([
    'Electronics', 'Appliances', 'Furniture', 'Clothing', 
    'Books', 'Sports', 'Beauty & Personal Care', 'Tickets', 'Other'
  ]).withMessage('Invalid product category'),
  body('condition').isIn(['Brand New', 'Like New', 'Good', 'Fair'])
    .withMessage('Invalid product condition'),
  body('location').isIn([
    'Cleveland', 'Columbus', 'Pittsburgh', 'Beijing', 
    'Shanghai', 'Guangzhou', 'Shunyi'
  ]).withMessage('Invalid location'),
  body('seller').isObject().withMessage('Seller information is required')
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Input validation failed',
        errors: errors.array()
      });
    }

    const listing = new Listing(req.body);
    await listing.save();

    res.status(201).json({
      success: true,
      data: listing,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update product
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
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: listing,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Mark product as sold
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
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: listing,
      message: `Product ${sold ? 'marked as sold' : 'unmarked as sold'}`
    });
  } catch (error) {
    console.error('Update product status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's products
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
    console.error('Get user products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;

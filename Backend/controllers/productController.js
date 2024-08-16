const Product = require('../models/Product'); // Assuming your Product model is in the models directory

// Get all products with pagination
exports.getProducts = async (req, res) => {
  const currentPage = req.query.page || 1;
  const pageSize = 2;
  const skip = (currentPage - 1) * pageSize;

  try {
    const products = await Product.find()
      .skip(skip)
      .limit(Number(pageSize))
      .populate('employeeIds', 'name position'); // Populate employee details

    const totalProducts = await Product.countDocuments();
    res.status(200).json({
      products,
      currentPage: Number(currentPage),
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// Get a single product by ID
exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).populate('employeeIds', 'name position');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    // Optionally, populate employee details if needed
    const populatedProduct = await Product.findById(savedProduct._id).populate('employeeIds', 'name position');

    res.status(201).json({
      message: 'Product added successfully',
      product: populatedProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error adding product' });
  }
};

// Edit a product by ID
exports.editProduct = async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updateData, { new: true }).populate('employeeIds', 'name position');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

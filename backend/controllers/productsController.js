const Product = require('../models/ProductModel');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  if (products) {
    res.json(products);
  }
  else {
    req.status(404).json({ message: "Product not found" });
  }
});

module.exports = { getProducts, getProduct };
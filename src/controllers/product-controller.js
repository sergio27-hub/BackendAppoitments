import * as productService from '../services/database/product-db-services.js';

export async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req, res) {
  const productData = req.body;

  try {
    const createdProduct = await productService.createProduct(productData);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

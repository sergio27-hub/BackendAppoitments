import Product from '../../models/product.js';

export async function getAllProducts() {
  const products = await Product.find();
  return products;
}

export async function createProduct(product) {
  const productDoc = new Product(product);
  const createdProduct = await productDoc.save();
  return createdProduct;
}

export async function getProductById(id) {
  const product = await Product.findById(id);
  return product;
}

export async function deleteProductById(id) {
  const product = await Product.findByIdAndDelete(id);
  return product;
}

export async function updateProductById(id, update) {
  const product = await Product.findByIdAndUpdate(id, update, { new: true });
  return product;
}

export async function getProductsByCategory(category) {
  const products = await Product.find
  ({ category });
  return products;
}

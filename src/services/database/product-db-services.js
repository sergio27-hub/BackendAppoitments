import Product from '../../models/product.js';

export async function getProducts() {
  const products = await Product.find();
  return products;
}

export async function createProduct(product) {
  const productDoc = new Product(product);
  const createdProduct = await productDoc.save();
  return createdProduct;
}

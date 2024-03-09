import { createProduct, getProductById, deleteProductById, updateProductById , getAllProducts } from '../services/database/product-db-services.js';

export async function getProductsController(req, res, next) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function createProductController(req, res, next) {
  try {
    const createdProduct = await createProduct(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
}

export async function getProductByIdController(req, res, next) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductByIdController(req, res, next) {
  try {
    const product = await deleteProductById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
}

export async function updateProductByIdController(req, res, next) {

  try {
    const product = await updateProductById(req.params.id, req.body);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

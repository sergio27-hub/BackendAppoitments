import { createProduct, getProductById, deleteProductById, updateProductById , getAllProducts } from '../services/database/product-db-services.js';
import { getUserByName } from '../services/database/user-db-services.js';

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
    const { name, category, description, price, createdBy } = req.body;
    const images = req.files.map(file => `/uploads/products/${file.filename}`);

    const validate = validacionProducto(name, category, description, price, images, createdBy);

    if (validate.length === 0) {
      const newProduct = {
        name,
        category,
        description,
        price,
        imageUrls: images,
        createdBy,
      };

      const product = await createProduct(newProduct);
      return res.status(201).send(product);
    }
      return res.status(400).send({ message: validate });

  } catch (error) {
    next(error);
  }
}

const validacionProducto = (name, category, description, price, images, createdBy) => {
  const errors = [];
  if (!name || name.trim() === '') {
    errors.push('Product name is required');
  }
  if (!category || category.trim() === '') {
    errors.push('Category is required');
  }
  if (!description || description.trim() === '') {
    errors.push('Description is required');
  }
  if (!price || isNaN(price)) {
    errors.push('Valid price is required');
  }
  if (!images || images.length === 0) {
    errors.push('At least one image is required');
  }
  if (!createdBy || createdBy.trim() === '') {
    errors.push('Created by is required');
  }
  return errors;
};


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

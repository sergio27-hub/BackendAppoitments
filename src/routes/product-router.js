import { Router } from 'express';
import { checkToken } from '../middlewares/auth-middleware.js';
import { createProductController, getProductsController, getProductByIdController, deleteProductByIdController, updateProductByIdController } from '../controllers/product-controller.js';
import { isAdmin, isProvider , isSuperUser, isUser } from '../middlewares/rolecheck-middleware.js';
const router = Router();

// Ruta para obtener todos los productos
router.get('/products', checkToken, getProductsController);

// Ruta para crear un nuevo producto (restringida a usuarios con rol 'admin')
router.post('/products', checkToken, createProductController);

// Ruta para obtener un producto por ID
router.get('/products/:id', checkToken, getProductByIdController);

// Ruta para actualizar un producto por ID (restringida a usuarios con rol 'admin')
router.put('/products/:id', checkToken, updateProductByIdController);

// Ruta para eliminar un producto por ID (restringida a usuarios con rol 'admin')
router.delete('/products/:id', checkToken, deleteProductByIdController);

export default router;

import { Router } from 'express';
import { checkToken } from '../middlewares/auth-middleware.js';
import {
  createProductController, getProductsController, getProductByIdController, deleteProductByIdController, updateProductByIdController,
} from '../controllers/product-controller.js';
import {
  isAdmin, isProvider, isSuperUser, isUser, isproadmin,
} from '../middlewares/rolecheck-middleware.js';

const router = Router();

router.get('/', getProductsController);

router.post('/',createProductController);

router.get('/:id', getProductByIdController);

router.patch('/:id', isproadmin, updateProductByIdController);

router.delete('/:id', isproadmin, deleteProductByIdController);

export default router;

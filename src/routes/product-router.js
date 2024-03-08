import { Router } from 'express';
import { getProducts } from '../controllers/product-controller.js'
import { checkToken } from '../middlewares/auth-middleware.js';


const router = Router();

router.get('/', getProducts);

export default router;

import express from 'express';
import { login } from '../controllers/login-controller.js';
import miscRouter from './misc-router.js';
import userRouter from './user-router.js';
import productRouter from './product-router.js';
import { checkToken } from '../middlewares/auth-middleware.js';



const router = express.Router();

router.post('/login', login);

router.use(miscRouter);
router.use('/users' ,checkToken,userRouter);
router.use('/products',checkToken,productRouter);

export default router;

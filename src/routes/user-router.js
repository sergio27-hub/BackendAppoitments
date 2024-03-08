import { Router } from 'express';
import { getUsersController , createUserController, deleteUserController , getUserMe, getUserByIdController} from '../controllers/user-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';

const router = Router();

router.get('/',getUsersController);
router.post('/signup', createUserController);
router.get('/:id', getUserByIdController);
router.delete('/:id', deleteUserController);


export default router;

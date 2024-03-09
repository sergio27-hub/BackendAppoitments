import { Router } from 'express';
import { getUsersController , createUserController, deleteUserController , getUserMe, getUserByIdController, updateUserByIdController, updateUserByIdPatchController} from '../controllers/user-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';
import { isAdmin, isProvider , isSuperUser, isUser } from '../middlewares/rolecheck-middleware.js';
import { verifyExistedRole } from '../middlewares/verifyExistedRole-middleware.js';

const router = Router();

router.get('/',getUsersController);
router.post('/signup', isAdmin ,verifyExistedRole ,createUserController);
router.get('/:id', getUserByIdController);
router.delete('/:id', deleteUserController);
router.get('/username/:username', getUserMe);
router.put('/update/:id', updateUserByIdController);
router.put('/update', updateUserByIdController);
router.patch('/updatepatch/:id', updateUserByIdPatchController);


export default router;

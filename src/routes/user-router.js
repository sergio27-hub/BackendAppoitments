import { Router } from 'express';
import { getUsersController , createUserController, deleteUserController , getUserMe, getUserByIdController, updateUserByIdController, updateUserByIdPatchController} from '../controllers/user-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';
import { isAdmin, isProvider , isproadmin, isSuperUser, isUser } from '../middlewares/rolecheck-middleware.js';
import { verifyExistedRole } from '../middlewares/verifyExistedRole-middleware.js';

const router = Router();

router.get('/',getUsersController);
router.post('/signup', isproadmin ,verifyExistedRole ,createUserController);
router.get('/:id', getUserByIdController);
router.delete('/:id', isproadmin ,deleteUserController);
router.get('/username/:username', getUserMe);
router.put('/update/:id', isproadmin ,updateUserByIdController);
router.put('/update', isproadmin ,updateUserByIdController);
router.patch('/updatepatch/:id', isproadmin , updateUserByIdPatchController);


export default router;

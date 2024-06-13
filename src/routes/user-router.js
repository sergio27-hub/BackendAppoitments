import { Router } from 'express';
import {
  getUsersController, createUserController, deleteUserController, getUserMe ,getUserByIdController, updateUserByIdController, updateUserByIdPatchController,
} from '../controllers/user-controller.js';
import { checkToken } from '../middlewares/auth-middleware.js';
import {
  isAdmin, isProvider, isproadmin, isSuperUser, isUser,
} from '../middlewares/rolecheck-middleware.js';
import { verifyExistedRole } from '../middlewares/verifyExistedRole-middleware.js';
import { upload } from '../middlewares/storage-middleware.js';

const router = Router();

router.get('/', getUsersController);
router.post('/signup',verifyExistedRole, upload.single('image') ,createUserController);
router.get('/:id', checkToken ,getUserByIdController);
router.delete('/:id', checkToken , deleteUserController);
router.get('/username/:username', checkToken ,getUserMe);
router.put('/update/:id', upload.single('image'),updateUserByIdController);
router.put('/update', upload.single('image') ,updateUserByIdController);
router.patch('/updatepatch/:id',upload.single('image') ,updateUserByIdPatchController);

export default router;

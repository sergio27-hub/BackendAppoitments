import { Router } from 'express';
import { checkToken } from '../middlewares/auth-middleware.js';
import {
  isAdmin, isProvider, isSuperUser, isUser, isproadmin,
} from '../middlewares/rolecheck-middleware.js';
import {
  getAppointmentsController, createAppointmentController, getAppointmentsByUserIdController , getAppointmentByIdController, deleteAppointmentByIdController, updateAppointmentByIdController, updateAppointmentByIdPatchController,
} from '../controllers/appoitment-controller.js';

const router = Router();

router.get('/', getAppointmentsController);
router.get('/user/:id', getAppointmentsByUserIdController)
router.post('/', createAppointmentController);
router.get('/:id', getAppointmentByIdController);
router.delete('/:id', deleteAppointmentByIdController);
router.put('/update/:id', updateAppointmentByIdController);
router.patch('/updatepatch/:id', updateAppointmentByIdPatchController);

export default router;

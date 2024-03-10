import { Router } from "express";
import { checkToken } from "../middlewares/auth-middleware.js";
import { isAdmin, isProvider, isSuperUser, isUser, isproadmin } from "../middlewares/rolecheck-middleware.js";
import { getAppointmentsController , createAppointmentController, getAppointmentByIdController , deleteAppointmentByIdController , updateAppointmentByIdController, updateAppointmentByIdPatchController } from "../controllers/appoitment-controller.js";

const router = Router();

router.get('/', isproadmin, getAppointmentsController);
router.post('/', isproadmin , createAppointmentController);
router.get('/:id', isproadmin ,getAppointmentByIdController);
router.delete('/:id', isproadmin ,deleteAppointmentByIdController);
router.put('/update/:id',isproadmin ,updateAppointmentByIdController);
router.patch('/updatepatch/:id',isproadmin ,updateAppointmentByIdPatchController);

export default router;

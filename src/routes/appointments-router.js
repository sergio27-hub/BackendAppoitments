import { Router } from "express";
import { checkToken } from "../middlewares/auth-middleware.js";
import { isAdmin, isProvider, isSuperUser, isUser } from "../middlewares/rolecheck-middleware.js";
import { getAppointmentsController , createAppointmentController} from "../controllers/appoitment-controller.js";

const router = Router();

router.get('/',getAppointmentsController);
router.post('/',createAppointmentController);
// router.get('/:id', getAppointmentsController);
// router.delete('/:id', deleteAppointmentByIdController);
// router.put('/update/:id', updateAppointmentByIdController);
// router.patch('/updatepatch/:id', updateAppointmentByIdPatchController);

export default router;

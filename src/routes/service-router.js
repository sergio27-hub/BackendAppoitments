import { Router } from "express";
import { checkToken } from "../middlewares/auth-middleware.js";
import { isAdmin, isProvider, isSuperUser, isUser } from "../middlewares/rolecheck-middleware.js";
import { createServiceController, getServicesController, getServiceByIdController , updateServiceByIdPatchController , deleteServiceByIdController , updateServiceByIdController , updateServiceByNameController} from "../controllers/Services-controller.js";


const router = Router();

router.get('/',getServicesController);
router.post('/create', createServiceController);
router.get('/:id', getServiceByIdController);
router.delete('/:id', deleteServiceByIdController);
router.put('/update/:id', updateServiceByIdController);
router.put('/update', updateServiceByIdController);
router.patch('/updatepatch/:id', updateServiceByIdPatchController);


export default router;

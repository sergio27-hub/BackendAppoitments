import { Router } from "express";
import { checkToken } from "../middlewares/auth-middleware.js";
import { isAdmin, isProvider, isSuperUser, isUser, isproadmin } from "../middlewares/rolecheck-middleware.js";
import { createServiceController, getServicesController, getServiceByIdController , updateServiceByIdPatchController , deleteServiceByIdController , updateServiceByIdController , updateServiceByNameController} from "../controllers/Services-controller.js";


const router = Router();

router.get('/',getServicesController);
router.post('/create',isproadmin ,createServiceController);
router.get('/:id', getServiceByIdController);
router.delete('/:id',isproadmin ,deleteServiceByIdController);
router.put('/update/:id', isproadmin ,updateServiceByIdController);
router.put('/update', isproadmin ,updateServiceByIdController);
router.patch('/updatepatch/:id', isproadmin , updateServiceByIdPatchController);


export default router;

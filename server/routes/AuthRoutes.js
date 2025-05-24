import { Router } from 'express';
import { checkuser, getAllUsers } from '../controllers/AuthController.js';
import { onboardUser } from '../controllers/AuthController.js';


const router=Router();


router.post('/check-user', checkuser);
router.post('/onboard-user', onboardUser);
router.get("/get-contacts", getAllUsers)

export default router;
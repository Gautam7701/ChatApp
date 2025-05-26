import { Router } from 'express';
import { addMessage } from '../controllers/MessageController.js';
import { getMessages } from '../controllers/MessageController.js';
import { addImageMessage } from '../controllers/MessageController.js';
import multer from 'multer';

const router = Router();


const uploadImage = multer({dest:"uploads/images"});
router.post('/add-message', addMessage);
router.get("/get-messages/:from/:to",getMessages)
router.get("/add-image-message",uploadImage.single("image"), addImageMessage);

export default router;

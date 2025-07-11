import { Router } from 'express';
import { addMessage, getInitialContactswithMessages } from '../controllers/MessageController.js';
import { getMessages } from '../controllers/MessageController.js';
import { addImageMessage } from '../controllers/MessageController.js';
import { addAudioMessage } from "../controllers/MessageController.js"
import multer from 'multer';


const router = Router();
 
const uploadImage = multer({dest:"uploads/images"});
const upload = multer({dest:"uploads/recordings"})

router.post('/add-message', addMessage);
router.get("/get-messages/:from/:to",getMessages)
router.post("/add-image-message",uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", upload.single("audio"),addAudioMessage)
router.get("/get-initial-contacts/:from",getInitialContactswithMessages);

export default router;

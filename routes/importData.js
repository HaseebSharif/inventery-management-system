import express from 'express';

import  {importProducts ,  downloadData} from '../controllers/importData.js';
import { verifyUser } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();


const upload = multer({ dest: 'uploads/' });

router.post("/import", verifyUser, upload.single('file') ,importProducts);
router.get("/download", downloadData);










export default router;
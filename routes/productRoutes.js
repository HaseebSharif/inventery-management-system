import express from 'express';

import  {createProduct ,getProducts , updateProduct , getProduct , deleteProduct} from '../controllers/productController.js';
import { verifyUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/create", verifyUser,createProduct);
router.patch("/update/:id", verifyUser, updateProduct);
router.get("/", verifyUser, getProducts);
router.get("/:id", verifyUser, getProduct);
router.delete("/delete/:id", verifyUser, deleteProduct);








export default router;
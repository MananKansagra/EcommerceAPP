import express from 'express';
import {listProduct,addProduct,removeProduct,singleProduct} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';


const productRouter = express.Router();

productRouter.post('/add',upload.fields([{name:`image1`,maxCount:1},{name:`image2`,maxCount:1},{name:`image3`,maxCount:1},{name:`image4`,maxCount:1}]),addProduct)
productRouter.get('/list',listProduct)
productRouter.get('/single',singleProduct)
productRouter.post('/remove',removeProduct)

export default productRouter;  //exporting the router to use in other files.  //export default product
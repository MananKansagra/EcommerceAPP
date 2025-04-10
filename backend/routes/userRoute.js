import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';

const userrouter = express.Router();



userrouter.post('/register',registerUser)
userrouter.post('/login',loginUser)
userrouter.post('/admin',adminLogin)


export default userrouter;  //exporting the router to use in other files.  //export
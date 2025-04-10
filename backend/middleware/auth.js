import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const authuser = async (req,res,next) => {
    

    const {token} = req.headers;

    if (!token) {
        return res.json({success:false,message:'Not authorized login again'})
  
    }

    try {
        
        const token_decode = jwt.verify(token,process.env.jwtSecret)
        req.body.userId = token_decode.id 
        res.setHeader("Set-Cookie", `userId=${token_decode.id}; Path=/; HttpOnly`);
        next()

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }






}

export default authuser;  //export the function so it can be used in other files  //export default
import jwt from 'jsonwebtoken';


const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:"Not Autoorized login again"})
        } 
        

        const tokenDecode = jwt.verify(token,process.env.jwtSecret)  ;
        if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ) {
            return res.json({success:false,message:"Not Autoorized login again"})
        } 
        next()
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}

export default adminAuth;  //export the function to use it in other files  //export default admin
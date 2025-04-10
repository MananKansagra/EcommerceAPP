import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// function to create tocken for new user

const createTocken = (id) => {
    return  jwt.sign({id},process.env.jwtSecret)
}





// route for user login
const loginUser = async (req,res) => {
    try {
        
        const {email,password} = req.body;


        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success:false ,message:"User not found"});
            
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.json({success:false ,message:"Invalid password"});
            
        }
        const token = createTocken(user._id);
        res.json({
            success: true,
            message: 'Login successful',
            token: token, 
            userId: user._id // Make sure this is included
          });
       
            

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}





// route for user registration

const registerUser = async (req,res) => {

    try {
        
        const {name ,email ,password} = req.body;

        // checking user already exist or not
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false ,message:"user already exists"})
        }

        // valiadating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false ,message:"please enter valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false ,message:"please enter strong password"})
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const tocken = createTocken(user._id)
        res.json({success:true,tocken})

       



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}


// route for admin login
const adminLogin = async (req,res) => {
    try {
        
        const {email,password} = req.body

        if (email ===  process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const tocken = jwt.sign(email+password,process.env.jwtSecret);
            res.json({success:true,tocken})
            
        }else{
            res.json({success:false,message:"invalid email or password"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


export {loginUser,registerUser,adminLogin}  // export the functions to be used in other files
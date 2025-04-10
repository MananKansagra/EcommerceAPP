import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js"
import mongoose from "mongoose"

const addToCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
      
      // Find the user document
      const userData = await userModel.findById(userId);
      
      // Create a copy of the cart data
      const cartData = { ...userData.cartData };
      
      // Update the cart data
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      
      // Update the document in the database
      const result = await userModel.findByIdAndUpdate(
        userId,
        { cartData: cartData },
        { new: true } // This returns the updated document
      );
      
      if (!result) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };





const updateCart = async (req,res) => {
    try {
        
        const { userId ,itemId ,size ,quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true,message:'Updated cart'})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getUserCart = async (req,res) => {
    
    try {
        
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success:true,cartData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}


export {addToCart,updateCart,getUserCart}
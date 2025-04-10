
import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


//global variables 
const currency = 'usd'
const deliveryCharge = 10

// GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing order using cod method

const placeOrder = async (req,res) => {
    
    try {
         const {userId ,items ,amount,address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:'order placed'})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

//place order stripe

const placeOrderStripe = async (req,res) => {
   try {
        const {userId ,items ,amount,address} = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date: Date.now()
        }
        
        const newOrder = new OrderModel(orderData);
        await newOrder.save();

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Product Name",
                    },
                    unit_amount: 1000,
                },
                quantity: 1,
            },
        ];

          

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'delivery charges',
                    
                },
                unit_amount: 10 
                
            },
            quantity:1
        })
    
    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        mode: 'payment',
        payment_method_types: ['card'],
        line_items

    })

    res.json({success:true,session_url:session.url})


   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }
}

// verify stripe payment
const verifyStripe = async (req,res) => {
    const {orderId ,success,userId} = req.body

    try {
        if (success === "true") {
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true})
        }
        else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } 
    catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
   

}

//place order using Razorpay
const placeOrderRazorpay = async (req,res) => {
    
}

// all orders data for admin panel

const allOrders = async (req,res) => {
    
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

// user oreder data for frontend

const userOrders = async (req,res) => {
   
    try {
        
        const {userId} = req.body;

        const orders = await OrderModel.find({ userId });
        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//update order status from admin panel

const updateStatus = async (req,res) => {
    try {
        
        const {orderId,status} = req.body;
        await OrderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Order status updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe}
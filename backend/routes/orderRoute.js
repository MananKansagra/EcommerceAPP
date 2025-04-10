import express from 'express';
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authuser from '../middleware/auth.js'

const orderRouter = express.Router()
// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features

orderRouter.post('/place',authuser,placeOrder)
orderRouter.post('/stripe',authuser,placeOrderStripe)
orderRouter.post('/razorpay',authuser,placeOrderRazorpay)

//user feature
orderRouter.post('/userorders',authuser,userOrders)

//verify payment 
orderRouter.post('/verifyStripe',authuser,verifyStripe)


export default orderRouter;

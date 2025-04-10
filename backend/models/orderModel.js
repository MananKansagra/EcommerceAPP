import mongoose, { Schema } from "mongoose";
import _default from "validator";


const orderSchema = new mongoose.Schema(
    {
        userId: { type: String ,required: true},
        items: { type: Array ,required: true},
        amount: { type: Number ,required: true},
        address: { type: Object ,required: true},
        status: { type: String ,required: true,default:'order placed'},
        paymentMethod:{ type: String ,required: true},
        payment: { type: Boolean ,required: true ,default: false},
        date: { type: Number ,required: true}



    }
)

const OrderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default OrderModel;  //export the model to use it in other files
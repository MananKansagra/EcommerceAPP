import {v2 as cloudinary} from 'cloudinary';
import { json } from 'express';
import productModel from '../models/productModel.js';



// function for add product
const addProduct = async (req, res) => {
    try {
        const {name,description,price,category,subcategory ,sizes,bestSeller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images =[image1,image2,image3,image4].filter((item)=> item !== undefined)

        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        console.log(name,description,price,category,subcategory ,sizes,bestSeller);
        const prouctData = {
            name,
            description,
            price:Number(price),
            category,
            subcategory,
            sizes:JSON.parse(sizes),
            bestSeller: bestSeller === "true",
            image: imagesURL,
            date:Date.now()


        }
        console.log(prouctData);

        const product = new productModel(prouctData);
        await product.save();
        

        res.json({success:true,message:"product Added"})
        
        
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
        
        
    }


}



// function for list product
const listProduct = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }

}


// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed"})
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }
}


// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
        

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error);
    }
}


export {listProduct,addProduct,removeProduct,singleProduct}





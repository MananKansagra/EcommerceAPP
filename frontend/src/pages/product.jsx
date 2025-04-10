import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import relatedProducts from '../components/RelatedProducts';
import RelatedProducts from '../components/RelatedProducts';


const product = () => {

  const {productId} = useParams();
  const {products,currency,addTocart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');
  

  const fetchProductData = async ()=> {

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  
  
  

  useEffect(()=>{
    fetchProductData();

  },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12  sm:gap-12 flex-col sm:flex-row'>

        {/** ------------------------------------------------product Images------------------------------------------------ */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto'/>
          </div>
        </div>
              {/**-------------------------------------------- product Details ----------------------------*/}

        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2 '>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3 5'  src={assets.starIcon} alt="" />
            <img className='w-3 5'  src={assets.starIcon} alt="" />
            <img className='w-3 5'  src={assets.starIcon} alt="" />
            <img className='w-3 5'  src={assets.starIcon} alt="" />
            <img className='w-3 5'  src={assets.starIconDull} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gary-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
              <p>select quantity/size</p>
              <div className='flex gap-2'>
              
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-50 ${item === size ? 'border-green-500 ' : ''}`} key={index}>
                    {item}
                  </button>
                ))}

              </div>
              <button onClick={()=>addTocart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-green-500' > ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p >100% prignal product.</p>
                <p >Cash on delivery is avilible on this product.</p>
                <p >easy 7 days Return policy.</p>
              </div>
          </div>
        </div> 
        

          </div>
          {/** ------------------------------------------- description & review Section ------------------------------------------------ */}    
          <div className='mt-20'>
            <div className='flex '>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'> Reviews(150) </p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
              <p>Our AgriTech E-Commerce Platform is designed to revolutionize the agricultural industry by providing farmers, gardeners, and agribusinesses with easy access to high-quality seeds, planting materials, tools, fertilizers, and more. With a seamless shopping experience, detailed product information, and a user-friendly interface, we ensure that customers find exactly what they need for successful farming and gardening.</p>
              <p>✅ Wide Product Range – From vegetable seeds to advanced farming tools, we offer a vast collection of agricultural essentials.</p>
              <p>✅ Secure Payment Integration – Safe and convenient payment options for hassle-free transactions.</p>
              <p>✅ Fast & Reliable Delivery – Ensuring on-time delivery to urban and rural locations.</p>
            </div>
          </div>

    {/**----------------------- diaplay related product section ---------------------------------------------- */}
    <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>
    
    </div>
  ) : <div className='opacity-0'></div>
}

export default product

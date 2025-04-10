import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { currency, backendURL ,token} = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {
    
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendURL + '/api/order/userorders',{},{ headers:{token} } )
      if(response.data.success){
        let allOrderItems = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date 
            allOrderItems.push(item)



          })
        })
        setOrderData(allOrderItems.reverse());
        
      }
      
    } catch (error) {
      console.log(error);
      
    }

  }


  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className='py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

            {/* Product Image and Details */}
            <div className='flex items-start gap-6 text-sm md:flex-1'>
              <img src={item.image[0]} className='w-16 sm:w-20 rounded-md' />
              <div>
                <p className='sm:text-base font-medium text-gray-900'>{item.name}</p>
                <div className='flex items-center gap-6 mt-2 text-gray-700 text-sm sm:text-base'>
                  <p >{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2 text-gray-500 text-sm'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-2 text-gray-500 text-sm'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>

              </div>
            </div>

            {/* Shipping Status and Track Order Button */}
            <div className='md:w-1/2 flex justify-between md:justify-end items-center gap-6'>
              <div className="flex items-center gap-2 text-green-600 font-medium text-sm md:text-base">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{item.status}</span>
              </div>
              <button onClick={loadOrderData} className='border border-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition'>
                Track Order
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Orders;

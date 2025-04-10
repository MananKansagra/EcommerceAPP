import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-base text-gray-700'>
      
        <div>
            <img src={assets.ExchangeIcon} className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange & returns</p>
            <p className='text-gray-400'>we offer hasselfree exchange and returns.</p>
        </div>

        <div>
            <img src={assets.QualityIcon} className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Quality products only</p>
            <p className='text-gray-400'>we only sell best Quality & farm fresh products</p>
        </div>


        <div>
            <img src={assets.SupportIcon} className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Customer Support</p>
            <p className='text-gray-400'>we listen your feedback 24*7</p>
        </div>


    </div>
  )
}

export default OurPolicy

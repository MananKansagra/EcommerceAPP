import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const about = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
      < Title text1={'ABOUT'} text2={'US'}/>
      </div>
      
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.AboutUs} className='w-full max-w-[450px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p >Plantastique was born from a simple yet powerful idea: to empower farmers, gardeners, and plant enthusiasts with cutting-edge AI technology to detect and prevent plant diseases effortlessly. Our journey began when a group of passionate tech innovators and agricultural experts saw the devastating impact of plant diseases on crops and gardens. Determined to find a solution, we combined our expertise in AI, machine learning, and agriculture to develop a smart, easy-to-use plant disease detection platform</p>
          <p >Our mission is to bridge the gap between technology and agriculture by providing an intuitive platform where users can simply upload an image of a plant leaf and receive an instant diagnosis. With a strong focus on accuracy, usability, and sustainability, we envision a future where plant diseases are identified early, ensuring a greener and more productive world.</p>
          <b className='text-gray-800'>Who Are We?</b>
          <p>At Plantastique, we are a team of engineers, researchers, and nature lovers committed to making plant care smarter and more efficient. We believe that healthy plants lead to a healthier planet, and with our advanced AI-powered disease detection system, we aim to help farmers boost crop yields, reduce losses, and practice sustainable agriculture.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p>At Plantastique, we prioritize precision, reliability, and sustainability in everything we offer. Our AI-powered plant disease detection ensures accurate diagnoses, while our high-quality seeds and tools are carefully tested for germination, durability, and eco-friendliness.</p>
          <p>We continuously improve our AI models, incorporate customer feedback, and promote sustainable farming practices. With trusted products and expert support, we help farmers and gardeners grow smarter and healthier. 🌱💚</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Custome service:</b>
          <p>Our dedicated support team is always ready to assist, providing expert guidance, quick resolutions, and personalized recommendations. We prioritize customer satisfaction, ensuring a hassle-free experience from purchase to harvest. 🌱💚</p>
        </div>

        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p>At Plantastique, we make gardening and farming effortless with a seamless shopping experience, fast delivery, and AI-powered plant health insights. Our intuitive platform ensures you find the best seeds, tools, and solutions with ease..</p>
        </div>

      </div>
s
      <NewsLetterBox />

    </div>
  )
}

export default about

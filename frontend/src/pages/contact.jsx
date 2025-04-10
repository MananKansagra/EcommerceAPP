import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { Mail, PhoneCall } from 'lucide-react' // Using Lucide icons for better UI

const Contact = () => {
  return (
    <div className="px-4 md:px-16 bg-gray-50 py-12">
      {/* Title Section */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Section */}
      <div className="my-10 flex flex-col md:flex-row items-center gap-16">
        {/* Image */}
        <img src={assets.AboutUs} className="w-full max-w-[400px] md:max-w-[450px] rounded-lg shadow-lg" />

        {/* Contact Details */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 p-6 bg-white shadow-lg rounded-lg">
          <img src={assets.Logo} className="mb-5 w-32" />

          <div className="text-center md:text-left">
            <p className="text-2xl text-black font-semibold mb-4">GET IN TOUCH</p>

            {/* Contact Info */}
            <div className="flex flex-col space-y-3 text-lg">
              <p className="flex items-center gap-3">
                <PhoneCall className="text-green-600" size={20} />
                +1-212-456-7890
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-blue-600" size={20} />
                Plantastique.info@gmail.com
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <a href="mailto:Plantastique.info@gmail.com" className="px-6 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700">
                Email Us
              </a>
              <a href="https://wa.me/12124567890" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="my-10">
        <NewsLetterBox />
      </div>
    </div>
  )
}

export default Contact

import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHnadler = (event)=>{
        event.preventDefault();

    }

  return (
    <div className='text-center '>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & Get 20% Off</p>
      <p className='text-gray-400 mt-3'>
      "Stay ahead in agriculture! Subscribe now for exclusive deals, expert tips, and the latest innovations to boost your farm’s success. Grow smarter with us!"
      </p>
      <form onSubmit={onSubmitHnadler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='enter your email'required/>
        <button className='bg-green-700 text-white px-10 py-4'  type='submit'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox

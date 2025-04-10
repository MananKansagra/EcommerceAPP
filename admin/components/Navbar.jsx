import React from 'react'
import  {assets} from '../src/assets/assets'

const Navbar = ({setTocken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)] ' src={assets.Logo} />
      <button onClick={()=> setTocken('')} className='bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' >Logout</button>
    </div>
  )
}

export default Navbar

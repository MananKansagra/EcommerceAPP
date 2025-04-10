import React, { useContext, useState } from 'react'
import  {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
function Navbar() {
    const [visible,setVisible] = useState(false)
    const {setShowSearch,getCartCount,navigate ,token,setToken, setCartItems } = useContext(ShopContext)


    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        
    }

  return (
    
    <div className='flex items-center justify-between py-5 font-medium'>
      
    <Link to='/'><img src={assets.Logo} alt='logo' className='w-36 gap-5' /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink className={'flex flex-col items-center gap-1'} to='/'>
                <p> HOME </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className={'flex flex-col items-center gap-1'} to='/collection'>
                <p> COLLECTION </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className={'flex flex-col items-center gap-1'} to='/about'>
                <p> ABOUT </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className={'flex flex-col items-center gap-1'} to='/contact'>
                <p> CONTACT </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>

            <NavLink className={'flex flex-col items-center gap-1'} to='/deaseasedetection'>
                <p> PLANT DEASEASE DETECTION </p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>

            <img onClick={()=>setShowSearch(true)} src={assets.Searchicon} alt='search' className='w-6 cursor-pointer' />

            <div className='group relative'>
                
                <img onClick={()=> token ? null : navigate('/login')} src={assets.Profileicon} alt='cart' className='w-6 cursor-pointer' />
         
                {/**we will display this div while we are logged in */}
                { token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-400 rounded'>

                        <p className='cursor-pointer hover:text-black'>My Profile </p>
                        <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders </p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout </p>

                    </div>
                </div>
                }
            </div>

            <Link to='/Cart' className='relative'>
                    <img src={assets.Carticon} alt='cart' className='w-6 min-w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] bg-black leading-4 text-white aspect-square rounded-full text-[12px]'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)} src={assets.Menuicon} className='w-5 cursor-pointer sm:hidden'></img>

        </div>
        {/* sidebar menu for smaller screen   */}
        <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-4 cursor-pointer'>
                    <img src={assets.Closeicon} className='h-4 rotate-180'/>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-none'to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-none' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-none'to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border-none' to='/contact'>CONTACT</NavLink>
            </div>


        </div>
        

    </div>
  )
}

export default Navbar

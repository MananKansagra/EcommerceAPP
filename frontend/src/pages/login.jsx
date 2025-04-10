import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { backendURL } from '../App';
import { ToastContainer,toast } from 'react-toastify';


const login = () => {
  const [currentState,setCurrentState] = useState('Login');
 

  const {token,setToken,navigate} = useContext(ShopContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  



  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        let response;
        if (currentState === 'Sign Up') {
            response = await axios.post(backendURL + '/api/user/register', { name, email, password });
            
            if (response.data.success) {
                toast.success('User created successfully');
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                
                // Store user ID from response
                if (response.data.userId) {
                    localStorage.setItem('userId', response.data.userId);
                } else if (response.data.user && response.data.user._id) {
                    // Alternative: if backend returns user object instead
                    localStorage.setItem('userId', response.data.user._id);
                }
            } else {
                toast.error(response.data.message);
            }
        } else {
            response = await axios.post(backendURL + '/api/user/login', { email, password });

            if (response.data.success) {
                toast.success('User Login Successfully');
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                
                // Store user ID from response
                if (response.data.userId) {
                    localStorage.setItem('userId', response.data.userId);
                } else if (response.data.user && response.data.user._id) {
                    // Alternative: if backend returns user object instead
                    localStorage.setItem('userId', response.data.user._id);
                }
            } else {
                toast.error(response.data.message);
            }
        }
        
        // Debug the response
        console.log('Full response:', response.data);
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col  items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Login' ? '' : <input required type='text' className='w-full px-3 py-2 border border-gray-800' onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name'/>}
      <input required type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
      <input required type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your Password?</p>
        {
          currentState === 'Login' 
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> 
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4' >{currentState === 'Login' ? 'Sign in' : 'Sign Up'}</button>

    </form>
  )
};

export default login

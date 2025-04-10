import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {Routes ,Route} from 'react-router-dom'
import Add from './pages/Add'
import Orders from './pages/Orders'
import ListProducts from './pages/ListProducts'
import Login from '../components/Login'
import { ToastContainer } from 'react-toastify'

export const backendURL = import.meta.env.VITE_BACKEND_URL
export const currency = '$'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)


   


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === ""
      ? <Login setToken={setToken} /> : 
      <>
      <Navbar setTocken={setToken} />

      <hr />

      <div className='flex w-full '>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>
            <Routes>
              <Route path='/add' element={<Add token={token} />} />
              <Route path='/list' element={<ListProducts token={token} />} />
              <Route path='/orders' element={<Orders token={token} />} />
            </Routes>
        </div>
      </div>

    
    </>      
      }
      
      
    </div>
  )
}

export default App

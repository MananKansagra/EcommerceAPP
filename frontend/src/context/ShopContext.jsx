import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import cart from "../pages/cart";
import { useNavigate } from "react-router-dom";




const backendURL = import.meta.env.VITE_BACKEND_URL



export const ShopContext = createContext();


const ShopContextProvider = (props) => {
     // Assuming userId is stored in local storage
    const currency = '$';
    const deliveryFee = 10;
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([])
    const [token,setToken] = useState('')
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    
    
    
   

    
    const addTocart = async (itemId,size)=>{

        if (!size) {
            toast.error('Select product size');
            return;
        }

        const userId = localStorage.getItem("userId");  // ✅ Retrieve stored userId
        const token = localStorage.getItem("token");
        console.log(userId);
        

         
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);


        if (token) {

            try {
                await axios.post(backendURL+'/api/cart/add', {itemId,size} , {headers:{token}})
                toast.success('Product added to cart');


            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
        

        
    }

    const getCartCount = ()=>{
        let totalcount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalcount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalcount;
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] =quantity;
        setCartItems(cartData);

        if(token){
            try{
                await axios.post(backendURL+'/api/cart/update', {itemId,size,quantity} , {
                    headers:{token}
                    })
                    toast.success('Quantity updated');
                    }catch(error){
                        console.log(error);
                        toast.error(error.message)
                    }
        }
        else{
            toast.error('Please login to update quantity');
            
        }

    }


    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
                for (const item in cartItems[items]) { // Fixed reference here
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                }
            }
        }
        return totalAmount;
    };
    
    

   const getProductData = async () => {
    try {
        const response = await axios.get(backendURL + '/api/product/list');
        if(response.data.success){
            setProducts(response.data.products);
            
        }else{
            toast.error(response.data.message)
        }
        
        
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
   }

   const getUserCart = async(token)=>{

    try {
        
        const response = await axios.post(backendURL+'/api/cart/get',{},{headers:{token}})
        if (response.data.success) {
            setCartItems(response.data.cartData)
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }

   }

   useEffect(()=>{
    getProductData();
   }, [token]) // Added token as a dependency

   useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
   })

    const value={
        products,currency,deliveryFee,search,setSearch,showSearch,setShowSearch,cartItems,addTocart,getCartCount
        ,updateQuantity,getCartAmount,navigate,setToken,token,setCartItems,backendURL

    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}



export default ShopContextProvider;
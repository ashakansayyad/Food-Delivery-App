import { addTokenToHeader } from "../utils/auth";
import axios from 'axios';


// add cart items to chackout 
export const addCartToCheckout = async(data)=>{
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/cart/addCartToCheckout`,data,{
        headers,
    })
    return res;
}


//get all cart items of specefic user 
export const getCartItems= async()=>{
    const headers  = addTokenToHeader({headers : {}});
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/cart`,{
        headers,
    })
    return res;
}


//place order 
export const placeOrder = async () => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/cart/orderSuccess`,
      {}, 
      { headers } 
    );
    return res;
  };
  

import { addTokenToHeader } from "../utils/auth";
import axios from 'axios';


//add debit card
export const addDebitCard = async(data)=>{
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/debitCard/`,data,{
        headers,
    })
    return res;
}


//get all debit cards
export const getAllDebitCards= async()=>{
    const headers  = addTokenToHeader({headers : {}});
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/debitCard`,{
        headers,
    })
    return res;
}
//get specefic debit card
export const getSpeceficCard= async(cardId)=>{
    const headers  = addTokenToHeader({headers : {}});
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/debitCard/${cardId}`,{
        headers,
    })
    return res;
}


// update debit card
export const updateDebitCard = async (cardId, data) => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/debitCard/updatecard/${cardId}`,
      data,
      { headers }
    );
    return res;
  };
  
  // delete debit card
  export const removeDebitCard = async (cardId) => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/debitCard/deletecard/${cardId}`,
      { headers }
    );
    return res;
  };
  

  

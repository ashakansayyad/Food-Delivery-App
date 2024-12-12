import axios from 'axios';

export const getCardsData = async(cardType)=>{
    const res = await axios.get( `${import.meta.env.VITE_BASE_URL}/api/card/${cardType}`);
    return res;
}
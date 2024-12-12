import React,{useState,useEffect} from "react";
import styles from "./Restaurants.module.css";
import {useNavigate} from 'react-router-dom';
import { getCardsData } from "../../apis/card";
function Restaurants() {
  const [restaurant,setRestaurant] =useState([]);
  const navigate = useNavigate();
  const fetchCardByType =async (cardType)=>{
    try{
      const res = await getCardsData(cardType);
      if(res && res.data){
          setRestaurant(res.data);
      }
    }catch(err){
      console.error(`Error fetching ${cardType} cards:`, err);
    
    }
  }
const handleNavigate=()=>{
  navigate('/product');
}

  useState(()=>{
    fetchCardByType("type3");
  },[])
  return (
    <div className={styles.restaurants}>

      {
        restaurant.map((item,index)=>{
          return  ( <div key={index} onClick={handleNavigate} className={styles.imageConatiner}>
            <img src={item.image} alt="img" />
            <p>{item.restaurantName}</p>
        </div>)
        })
      }
      
    
    </div>
  );
}

export default Restaurants;

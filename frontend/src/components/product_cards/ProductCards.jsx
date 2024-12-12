import React, { useState, useEffect } from "react";
import styles from "./ProductCards.module.css";
import { getCardsData } from "../../apis/card";

function ProductCards({addToCart}) {
  const [cards, setCards] = useState([]);
  const [burgers, setBurgers] = useState([]);
  const [fries, setFries] = useState([]);
  const [coldDrinks, setColdDrinks] = useState([]);
  const fetchCardByType = async (cardType) => {
    try {
      const res = await getCardsData(cardType);
      if (cardType === "type5") {
        setCards(res.data);
      } else if (cardType === "burgers") {
        setBurgers(res.data);
      } else if (cardType === "fries") {
        setFries(res.data);
      
      } else if (cardType === "coldDrinks") {
        setColdDrinks(res.data);

      }
    } catch (err) {
      console.error(`Error fetching ${cardType} cards:`, err);
    }
  };

  const fetchAllCards = async () => {
    await Promise.all([
      fetchCardByType("type5"),
      fetchCardByType("burgers"),
      fetchCardByType("fries"),
      fetchCardByType("coldDrinks"),
    ]);
  };
  useEffect(() => {
    fetchAllCards();
  }, []);
  return (
    <div className={styles.productcards}>
      <div className={styles.productcards_cardOne}>
        {cards.map((item, index) => (
          <span
            key={index}
            style={{ backgroundImage: `url(${item.imageOne})` }}
            className={styles.back_imgContainer}
          >
            <div className={styles.image_top}>
              <span>{item.discount}</span>
            </div>
            <div className={styles.image_bottom}>
              <span className={styles.image_bottom_left}>
                <p>{item.restaurantName}</p>
                <h2>{item.titleOne}</h2>
              </span>
              <span className={styles.image_bottom_right}>
                <img src={item.imageTwo} alt="icon" />
              </span>
            </div>
          </span>
        ))}
      </div>
      <div className={styles.productcards_burgersConatiner}>
        <h1>Burgers</h1>
        <div className={styles.all_burgers_itemContainer}>
          {burgers.map((item, index) => (
            <div key={index} className={styles.burgers_container}>
              <span className={styles.burgers_container_left}>
                <h3>{item.foodName}</h3>
                <p id={styles.description}>{item.titleOne}</p>
                <p id={styles.price}>&#8377; {item.price}</p>
              </span>
              <span className={styles.burgers_container_right}>
              <div className={styles.burgers_container_right_foodImgConatiner}>
                <img id={styles.foodImg} src={item.imageOne} alt="img" />
                <span onClick={()=>addToCart({ _id: item._id,foodName:item.foodName,price:item.price,image:item.imageOne})}>
                  <img src={item.imageTwo} alt="img" />
                </span>
              </div>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.productcards_friesConatiner}>
        <h1  style={{color:"#FC8A06"}}>Fries</h1>
        <div className={styles.all_fries_itemContainer}>
          {fries.map((item, index) => (
            <div key={index} className={styles.fries_container}>
              <span className={styles.fries_container_left}>
                <h3>{item.foodName}</h3>
                <p id={styles.description}>{item.titleOne}</p>
                <p id={styles.price}>&#8377; {item.price}</p>
              </span>
              <span className={styles.fries_container_right}>
              <div className={styles.fries_container_right_foodImgConatiner}>
                <img id={styles.foodImg} src={item.imageOne} alt="img" />
                <span onClick={()=>addToCart({ _id: item._id,foodName:item.foodName,price:item.price,image:item.imageOne})}>
                  <img src={item.imageTwo} alt="img" />
                </span>
              </div>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.productcards_coldDrinksConatiner}>
        <h1 style={{color:"#FC8A06"}}>Cold Drinks</h1>
        <div className={styles.all_coldDrinks_itemContainer}>
          {coldDrinks.map((item, index) => (
            <div key={index} className={styles.coldDrinks_container}>
              <span className={styles.coldDrinks_container_left}>
                <h3>{item.foodName}</h3>
                <p id={styles.description}>{item.titleOne}</p>
                <p id={styles.price}>&#8377; {item.price}</p>
              </span>
              <span className={styles.coldDrinks_container_right}>
              <div className={styles.coldDrinks_container_right_foodImgConatiner}>
                <img id={styles.foodImg} src={item.imageOne} alt="img" />
                <span onClick={()=>addToCart({ _id: item._id,foodName:item.foodName,price:item.price,image:item.imageOne})}>
                  <img src={item.imageTwo} alt="img" />
                </span>
              </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCards;

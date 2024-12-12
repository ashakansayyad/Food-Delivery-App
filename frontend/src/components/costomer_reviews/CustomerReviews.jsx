import React, { useState, useEffect } from "react";
import styles from "./CustomerReviews.module.css";
import { getCardsData } from "../../apis/card";
import review_arrow_left from "../../assets/review_left_arrow.svg";
import review_arrow_right from "../../assets/review_right_arrow.svg";
import user_rating_img from '../../assets/ratings_product_banner_img.svg'
function CustomerReviews() {
  const [reviewCards, setReviewCards] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  // Fetch reviews from API
  const fetchCardByType = async (cardType) => {
    try {
      const res = await getCardsData(cardType);
      if (res && res.data) {
        setReviewCards(res.data);
      }
    } catch (err) {
      console.error(`Error: fetching with card ${cardType}`, err);
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchCardByType("reviews");
  }, []);

  // Function to handle left arrow click
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Function to handle right arrow click
  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < reviewCards.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <div className={styles.customerreviews}>
      <div className={styles.customerreviews_top}>
        <h2>Customer Reviews</h2>
        <div className={styles.customerreviews_top_right}>
          <span onClick={handleLeftClick}>
            <img src={review_arrow_left} alt="left arrow" />
          </span>
          <span onClick={handleRightClick}>
            <img src={review_arrow_right} alt="right arrow" />
          </span>
        </div>
      </div>

      <div className={styles.customerreviews_bottom}>
        {reviewCards.slice(currentIndex, currentIndex + 3).map((item, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.customerreviews_bottom_top}>
              <div className={styles.customerreviews_bottom_top_left}>
                <img src={item.imageOne} alt="img" />
                <p id={styles.break_line}>|</p>
                <span>
                  <p id={styles.titleOne}>{item.titleOne}</p>
                  <p id={styles.titleTwo}>{item.titleTwo}</p>
                </span>
              </div>
              <div className={styles.customerreviews_bottom_top_right}>
                <img src={item.imageTwo} alt="im" />
                <span>
                  <img src={item.imageThree} alt="im" />
                  <p>{item.titleThree}</p>
                </span>
              </div>
            </div>
            <div className={styles.customerreviews_bottom_bottom}>
              <p>{item.titleFour}</p>
            </div>
          </div>
        ))}
      </div>
      <img id={styles.rating_img} src={user_rating_img} alt="img" />
    </div>
  );
}

export default CustomerReviews;

import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import banner_img_one from "../../assets/home_main_img1.png";
import one from "../../assets/one.svg";
import app_logo_small from "../../assets/app_logo_small.svg";
import app_logo from "../../assets/app_logo.svg";
import app_store_logo from "../../assets/app_store_logo.svg";
import google_play_logo from "../../assets/google_play_store_logo.png";
import red_map from "../../assets/red_map.svg";
import male_and_female from "../../assets/male_and_femal.png";
import two from "../../assets/two.svg";
import three from "../../assets/three.png";
import check_tick from "../../assets/green_tick.svg";
import Navbar from "../../components/navbar/Navbar";
import Restaurants from "../../components/restaurants/Restaurants";
import Aboutus from "../../components/about_us/Aboutus";
import HomeStats from "../../components/home_stats/HomeStats";
import Footer from "../../components/footer/Footer";
import { getCardsData } from "../../apis/card";
function Home() {
  const [dealsCard, setDealsCard] = useState([]);
  const [categoriesCard, setCategoriesCard] = useState([]);
  const [maleCard, setMaleCard] = useState([]);
 
  const fetchCardByType = async (cardType) => {
    try {
      const res = await getCardsData(cardType);
      if (res && res.data) {
        if (cardType === "type1") {
          setDealsCard(res.data);
        } else if (cardType === "type2") {
          setCategoriesCard(res.data);
        } else {
          setMaleCard(res.data);
        }
      }
    } catch (err) {
      console.error(`Error fetching ${cardType} cards:`, err);
    }
  };

  useEffect(() => {
    const fetchAllCards = async () => {
      await Promise.all([
        fetchCardByType("type1"),
        fetchCardByType("type2"),
        fetchCardByType("type4"),
      ]);
    };
    fetchAllCards();
  }, []);

  return (
    <div className={styles.home}>
   
        <Navbar />
     
      <div className={styles.home_main}>
        <div className={styles.home_main_banner}>
          <div className={styles.home_main_banner_left}>
            <span className={styles.banner_title}>
              <p>Order Restaurant food, takeaway and groceries.</p>
              <h1>Feast Your Senses,</h1>
              <h1 id={styles.title_color}>Fast and Fresh</h1>
            </span>
            <div className={styles.benner_searchContainer}>
              <p>Enter a postcode to see what we deliver</p>
              <span>
                <input type="text" placeholder="e.g. EC4R 3TE" />
                <button>Search</button>
              </span>
            </div>
          </div>
          <div className={styles.home_main_banner_mid}>
            <img src={banner_img_one} alt="img" />
          </div>
          <div className={styles.home_main_banner_right}>
            <div className={styles.background_div}>
              <div className={styles.background_div_right}>
                <div className={styles.card_container_one}>
                  <img id={styles.one} src={one} alt="one" />
                  <div>
                    <span>
                      <img src={app_logo_small} alt="icon" /> <p>now</p>
                    </span>
                    <h2>
                      We’ve Received your order! <img src={red_map} alt="img" />
                    </h2>
                    <p>Awaiting Restaurant acceptance </p>
                  </div>
                </div>
                <div className={styles.card_container_two}>
                  <img id={styles.two} src={two} alt="img" />
                  <div>
                    <span>
                      <img src={app_logo_small} alt="icon" /> <p>now</p>
                    </span>
                    <h2>
                      Order Accepted! <img src={check_tick} alt="im" />
                    </h2>
                    <p>Your order will be delivered shortly </p>
                  </div>
                </div>
                <div className={styles.card_container_three}>
                  <img id={styles.three} src={three} alt="ig" />
                  <div>
                    <span>
                      <img src={app_logo_small} alt="icon" /> <p>now</p>
                    </span>
                    <h2>Your rider's nearby 🎉 </h2>
                    <p>They are almost their - get ready! </p>
                  </div>
                </div>
              </div>
              <div className={styles.back_img}></div>
            </div>
          </div>
        </div>
        <div className={styles.home_main_dealsContainer}>
          <nav>
            <h2>Up to -40% 🎊 Order.uk exclusive deals</h2>
            <span>
              <p>Vegan</p> <p>Sushi</p> <p id={styles.navTitle}> Pizza & Fast food </p> <p>others</p>
            </span>
          </nav>
          <div className={styles.home_main_dealsContainer_imageContainer}>
            {dealsCard.map((item, index) => (
              <span
                key={index}
                style={{ backgroundImage: `url(${item.image})` }}
                className={styles.back_imgContainer}
              >
                <div className={styles.image_top}>
                  <span>{item.discount}</span>
                </div>
                <div className={styles.image_bottom}>
                  <p>{item.restaurant}</p>
                  <h3>{item.restaurantName}</h3>
                </div>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.home_main_categoriesContainer}>
          <div className={styles.categoriesContainer_top}>
            <h2>Order.uk Popular Categories 🤩</h2>
          </div>

          <div className={styles.allimageConatiner}>
            {categoriesCard.map((item, index) => (
              <div key={index} className={styles.imageConatiner}>
                <img src={item.image} alt="img" />
                <span>
                  {" "}
                  <h3>{item.foodName}</h3>
                  <p>{item.restaurant}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.home_main_popularRestorants_ttile}>
          <h2>Popular Restaurants</h2>
        </div>
        <Restaurants />
        <div className={styles.home_main_bannerTwo}>
          <span className={styles.home_main_bannerTwo_left}>
            <img src={male_and_female} alt="img" />
          </span>
          <div className={styles.home_main_bannerTwo_right}>
            <span className={styles.banner_two_titleContainer}>
              <span>
                {" "}
                <img src={app_logo} alt="icon" />
                <h1>ing</h1>{" "}
              </span>{" "}
              <h1>is more</h1>
            </span>
            <div className={styles.personalize_Container}>
              <p>
                {" "}
                <span>Personalised</span> & Instant
              </p>
            </div>
            <p id={styles.heading_three}>
              Download the Order.uk app for faster ordering
            </p>
            <span id={styles.icons_Container}>
              <img src={app_store_logo} alt="im" />
              <img src={google_play_logo} alt="im" />
            </span>
          </div>
        </div>
        <div className={styles.home_main_bannerTwo_cardConatiner}>
          {maleCard.map((item, index) => (
            <span
              key={index}
              style={{ backgroundImage: `url(${item.image})` }}
              className={styles.back_imgContainer}
            >
              <div className={styles.banner_Two_image_top}>
                <span>{item.titleOne}</span>
              </div>
              <div className={styles.banner_Two_image_bottom}>
                <p>{item.titleTwo}</p>
                <h3>{item.titleThree}</h3>
                <button>{item.titleFour}</button>
              </div>
            </span>
          ))}
        </div>
        <Aboutus />
        <HomeStats />
      </div>

      <Footer />
    </div>
  );
}

export default Home;

import React from "react";
import styles from "./Aboutus.module.css";
import order_food_img from '../../assets/order_food_img.svg'
import progreess_food_img from '../../assets/progress_food_img.svg'
import get_order_mobile_img from '../../assets/get_order_mobile_img.svg'
function Aboutus() {
  return (
    <div className={styles.aboutus}>
      <div className={styles.aboutus_top}>
        <h2>Know more about us!</h2>
        <span>
        
          <p id={styles.navHeading}>Frequent Questions </p> <p> Who we are? </p>
          <p> Partner Program </p> <p> Help & Support</p>
        </span>
      </div>
      <div className={styles.aboutus_bottom}>
            <div className={styles.aboutus_bottom_left}>
                <p id={styles.buttonHeading}>How does Order.UK work?</p>
                <p>What payment methods are accepted?</p>
                <p>Can I track my order in real-time?</p>
                <p>Are there any special discounts or <br /> promotions available?</p>
                <p>Is Order.UK available in my area?</p>
            </div>
            <div className={styles.aboutus_bottom_right}>
                <div className={styles.aboutus_bottom_right_cardContainer}>
                    <span>
                        <p id={styles.title}>Place an Order!</p>
                        <img src={order_food_img} alt="img" />
                        <p>Place order through our <br />website or Mobile app</p>
                    </span>
                    <span>
                        <p  id={styles.title}>Track Progress</p>
                        <img src={progreess_food_img} alt="img" />
                        <p>Your can track your order <br /> status with delivery time</p>
                    </span>
                    <span>
                        <p  id={styles.title}>Get your Order!</p>
                        <img src={get_order_mobile_img} alt="img" />
                        <p>Receive your order at a <br /> lighting fast speed!</p>
                    </span>

                </div>
                <p id={styles.subheading}>Order.UK simplifies the food ordering process. Browse through our diverse menu,<br /> select your favorite dishes, and proceed to checkout. Your delicious meal will be <br /> on its way to your doorstep in no time!</p>
            </div>

      </div>
    </div>
  );
}

export default Aboutus;

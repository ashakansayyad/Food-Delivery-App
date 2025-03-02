import React, {useContext } from "react";
import styles from './Payment.module.css';
import Navbar from '../../components/navbar/Navbar';
import left_arrow from "../../assets/checkout_left_arrow.svg";
import wallete_icon  from "../../assets/wallet_icon.svg";
import right_arrow from "../../assets/checkout_add_right_arrow.svg";
import mastercard_icon from "../../assets/masterCard_icon.svg";
import paypal_icon from "../../assets/paypal_icon.svg";
import stripe_icon from "../../assets/stripe_icon.svg";
import add_debit_card_icon from "../../assets/add_debit_card_icon.svg";
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from "../../context/Modal";
import { placeOrder } from "../../apis/cart";
import { toast } from "react-toastify";
function Payment() {
  const navigate = useNavigate();
  const {totalCartAmout,placedOrderItems,setPlacedOrderItems} = useContext(ModalContext);

  const handlePlaceOrder = async()=>{
    try{
        const res = await placeOrder();
        if(res && res.status === 200){
          toast.success("Order place Successfully!");
          setPlacedOrderItems(res.data.orderedItems)
          navigate('/ordersuccess');
        }
    }catch(err){
      if (err.response ) {
        toast.error(err.response.data.message);
      } else {
        console.error(err.response);
      }
    }
  }


  return (
    <div className={styles.payment}>
      <Navbar/>
        <div className={styles.payment_body}>
          <div className={styles.payment_body_header}>
            <img onClick={()=>navigate('/checkout')} src={left_arrow}  />
            <h2>Choose and Pay</h2>
          </div>
          <div className={styles.payment_body_mainContsiner}>
            <div className={styles.payment_body_mainContsiner_left}>
              <div className={styles.walletContainer}>
                <div className={styles.two_item_cntainer}>
                  <span id={styles.wallete_imgContainer}>
                    <img src={wallete_icon} alt='kds'/>

                  </span>
                <span id={styles.wallet_dexription}>
                  <p>Wallet</p>
                  <p id={styles.balance}>Available balance: ₹300</p>
                </span>
                </div>
                <img src={right_arrow} />
              </div>
              <p id={styles.the_line}></p>
              <div className={styles.mastercardContainer}>
              <div className={styles.two_item_cntainer}>
                <img src={mastercard_icon}  />
                <p>MaestroKard</p>
              </div>
              <span id={styles.select_o}>o</span>
              </div>
              <div className={styles.paypalContainer}>
              <div className={styles.two_item_cntainer}>
                <img src={paypal_icon}  />
                <p>Paypal</p>
              </div>
              <span id={styles.select_o}>o</span>
              </div>
              <div className={styles.stripeContainer}>
              <div className={styles.two_item_cntainer}>
                <img src={stripe_icon}  />
                <p>Stripe</p>
              </div>
              <span id={styles.select_o}>o</span>
              </div>
              <div className={styles.addDebitCardContainer}>
                <img src={add_debit_card_icon}  />
                <p>Add Debit Card</p>
              </div>
            </div>
            <div className={styles.payment_body_mainContsiner_right}>
              <div className={styles.amount}>
                <p>Amount to be payed</p>
                <p>₹{totalCartAmout}</p>
              </div>
              <p id={styles.the_line}></p>
              <button onClick={handlePlaceOrder}>Proceed Payment</button>
            </div>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default Payment

import React, { useContext } from "react";
import styles from './OrderSuccess.module.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import order_success_circle from '../../assets/order_success_circle.jpg';
import { useNavigate } from 'react-router-dom';
import { getCartItems } from "../../apis/cart";
import { ModalContext } from "../../context/Modal";

function OrderSuccess() {
  const {placedOrderItems} = useContext(ModalContext);
  // const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  return (
    <div className={styles.ordersuccess}>
      <Navbar/>
      <div className={styles.ordersuccess_mainConatiner}>
        <div className={styles.ordersuccess_mainConatiner_top}>
            <div className={styles.success_container}>
                <img src={order_success_circle} />
            </div>
            <h3>Order Placed Successfully</h3>
            <p>Your order is confirmed and on its way. Get set to <br /> savor your chosen delights!</p>
        </div>
        <div className={styles.ordersuccess_mainConatiner_bottom}>
          <div className={styles.item_names}>
        {placedOrderItems?.length > 0 ? (
                placedOrderItems?.map((item) => (
                  <p key={item._id}>{item.foodName}</p>
                ))
              ) : (
                <p>Loading cart items...</p>
              )}
              
             
            </div>

              

            <button onClick={()=>navigate('/')}>Back to Home</button>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default OrderSuccess

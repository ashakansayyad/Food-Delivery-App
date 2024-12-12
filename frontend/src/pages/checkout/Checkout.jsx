import React, { useState, useEffect,useContext } from "react";
import styles from "./Checkout.module.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Restaurants from "../../components/restaurants/Restaurants";
import left_arrow from "../../assets/checkout_left_arrow.svg";
import map_icon from "../../assets/checkout_delivery_add_map.svg";
import right_arrow from "../../assets/checkout_add_right_arrow.svg";
import { getCartItems } from "../../apis/cart";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/Modal";

function Checkout() {
  const {totalCartAmout,setTotalCartAmount} = useContext(ModalContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const fetchCartItems = async () => {
    try {
      const res = await getCartItems();
      if (res && res.data) {
        setCartItems(res.data.items); 
        setTotalCartAmount(res.data.totalToPay);
        console.log("checkout: ", res.data);
      }
    } catch (err) {
      console.error("Error fetching cart items");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className={styles.checkout}>
      <Navbar />
      <div className={styles.checkout_header}>
        <div className={styles.checkout_orderDetails_Container}>
          <span className={styles.headingSection}>
            <img onClick={()=>navigate('/product')} src={left_arrow} />
            <h2>Your Order Details</h2>
          </span>
          <div className={styles.mainContainer}>
            <div className={styles.checkout_orderDetails_Container_left}>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item._id} className={styles.singleItem}>
                    <span id={styles.singleItem_itemContainer}>
                      <img src={item.image} alt={item.foodName} />
                      <span id={styles.description}>
                        <p id={styles.foodName}>{item.foodName}</p>
                        <p id={styles.quantity}>{item.quantity}x item</p>
                      </span>
                    </span>
                    <p id={styles.price}>₹{item.price}</p>
                  </div>
                ))
              ) : (
                <p>Loading cart items...</p>
              )}
              <div className={styles.oderDetail_notes}>
                <p>Notes</p>
                <input type="text" placeholder="Add order notes" />
              </div>
            </div>
            <div className={styles.checkout_orderDetails_Container_right}>
              <div onClick={()=>navigate('/address')} className={styles.addContainer}>
                <div className={styles.addContainer_map_and_add}>
                <span id={styles.mapContainer}>
                  <img src={map_icon} alt="icon" />
                </span>
                <span id={styles.delivey_add}>
                  <p id={styles.add_heading}>Delivery Address</p>
                  <p id={styles.address}>45, Green Street, Sector 12...</p>
                </span>
                </div>
                <img src={right_arrow}  />
              </div>
              <p id={styles.the_line}></p>
              <div className={styles.calculationContainer}>
                <span><p>Items</p> <p>₹{totalCartAmout}</p></span>
                <span><p>Sales Tax</p> <p>₹0</p></span>
              </div>
              <span id={styles.subTotal}><p>Subtotal ({cartItems?.length} items)</p> <p id={styles.price}>₹{totalCartAmout}</p></span>
              <button onClick={()=>navigate('/payment')}>Choose Payment Method</button>
            </div>
          </div>
        </div>
     
      <h2>Similar Restaurants</h2>
  
        <Restaurants />
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;

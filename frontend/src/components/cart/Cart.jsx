import React from "react";
import styles from "./Cart.module.css";
import share_icon from "../../assets/share_cart_icon.svg";
import cart_icon from "../../assets/cart_icon.svg";
import delete_icon from "../../assets/delete_cart_item_icon.svg";
import choose_item_arrow from "../../assets/cart_choose_item_down_arrow.svg";
import apply_coupen_arrow from "../../assets/cart_apply_coupon_right_arrow.svg";
import scooter_icon from "../../assets/cart_delivery_scooter_icon.svg";
import collection_icon from "../../assets/cart_collection_icon.svg";
import checkout_arrow_icon from "../../assets/cart_checkout_right_arrow.svg";

function Cart({
  cart,
  removeFromCart,
  discount,
  deliveryCharge,
  calculateSubtotal,
  totalToPay,
  handleCheckout
}) {
  return (
    <div className={styles.cart}>
      <div className={styles.cart_share_container}>
        <img src={share_icon} alt="im" />
        <p>
          Share this cart <br /> with your friends
        </p>
        <button>Copy Link</button>
      </div>
      <div className={styles.cart_basketConatiner}>
        <div className={styles.cart_basketConatiner_header}>
          <img src={cart_icon} alt="ic" />
          <h3>My Basket</h3>
        </div>
        <div className={styles.cart_basketConatiner_main}>
          <div className={styles.cart_all_itemsContainer}>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>Your cart is empty</div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className={styles.single_itemContainer}>
                  <span id={styles.item_quantity}>
                    <p>{item.quantity}x</p>
                  </span>
                  <span id={styles.item_description}>
                    <p id={styles.price}>&#8377; {item.subtotal}</p>
                    <p id={styles.item_name}>{item.foodName}</p>
                  </span>
                  <img
                    onClick={() => removeFromCart(item)}
                    src={delete_icon}
                    alt="ic"
                  />
                </div>
              ))
            )}
          </div>
          <div className={styles.cart_items_calculation}>
            <span>
              <h3>Sub Total: </h3> <p>&#8377;{calculateSubtotal()}.00</p>
            </span>
            <span>
              <h3>Discounts: </h3> <p>- &#8377;{discount}</p>
            </span>
            <span>
              <h3>Delivery Fee: </h3> <p>&#8377;{deliveryCharge}</p>
            </span>
          </div>
          <div className={styles.totalAmount_CoupenConatiner}>
            <span id={styles.total_pay}>
              {" "}
              <p>Total to pay</p>{" "}
              <p id={styles.total_price}>&#8377;{totalToPay}.00</p>
            </span>
            <span id={styles.choose_item}>
              <p>Choose your free item..</p> <img src={choose_item_arrow} />
            </span>
            <span id={styles.appy_coupen}>
              <p>Apply Coupon Code here</p> <img src={apply_coupen_arrow} />
            </span>
          </div>
          <div className={styles.cart_checkoutContainer}>
            <div className={styles.cart_checkoutContainer_top}>
              <span id={styles.deliveryConstainer}>
                <img src={scooter_icon} />
                <p id={styles.delivery}>Delivery</p>
                <p id={styles.time}>Starts at 17:50</p>
              </span>
              <span id={styles.collectionContainer}>
                <img src={collection_icon} />
                <p>Collection</p>
                <p>Starts at 16:50</p>
              </span>
            </div>
            <div onClick={handleCheckout} className={styles.cart_checkoutContainer_bottom}>
              <img src={checkout_arrow_icon} /> <h3>Checkout!</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

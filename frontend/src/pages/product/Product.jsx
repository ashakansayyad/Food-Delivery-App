import React,{useEffect, useState} from "react";
import styles from "./Product.module.css";
import Navbar from "../../components/navbar/Navbar";
import burger_banner_img from "../../assets/burger_product_banner_img.png";
import ratings_banner_img from "../../assets/ratings_product_banner_img.svg";
import checklist_banner_icon from "../../assets/order_list_product_banner_icon.svg";
import delivery_banner_icon from "../../assets/delivery_product_banner_icon.svg";
import clock_banner_icon from "../../assets/clock_product_banner_icon.svg";
import search_icon from "../../assets/serach_icon.svg";
import ProductCards from "../../components/product_cards/ProductCards";
import ServiceInfo from "../../components/serviceinfo/ServiceInfo";
import Map from "../../components/map/Map";
import Footer from '../../components/footer/Footer';
import CustomerReviews from "../../components/costomer_reviews/CustomerReviews";
import Restaurants from '../../components/restaurants/Restaurants';
import Cart from "../../components/cart/Cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCartToCheckout } from '../../apis/cart';

function Product() {
  const [cart,setCart] = useState([]);
  const [isCartVisible,setIsCartVisible] = useState(false);
  const [discount, setDiscount] = useState(10); // Add a discount state
  const [deliveryCharge, setDeliveryCharge] = useState(50); // Default delivery charge
  const [totalToPay, setTotalToPay] = useState(0); // Final amount to pay
  const navigate = useNavigate();
  
  
const addToCart = (item) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      return prevCart.map((cartItem) =>
        cartItem._id === item._id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              subtotal: (cartItem.quantity + 1) * cartItem.price,
            }
          : cartItem
      );
    }

    return [...prevCart, { ...item, quantity: 1, subtotal: item.price }];
  });

  setIsCartVisible(true);
  toast.success(`${item.foodName} added to cart!`);
};

const removeFromCart = (item) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find(cartItem=>cartItem._id === item._id);

    if (existingItem.quantity > 1) {
      // Decrease quantity and update subtotal
      return prevCart.map(cartItem =>
        cartItem._id === item._id
        ? { ...cartItem, quantity: cartItem.quantity - 1, subtotal: (cartItem.quantity - 1) * cartItem.price }
          : cartItem
        );
      } else {
        // Remove item completely if quantity becomes 0
      return prevCart.filter(cartItem => cartItem._id !== item._id);
    }
  });
  toast.success(`${item.foodName} removed from cart!`);
};

const calculateSubtotal = ()=>{
  return cart.reduce((sum,item)=>sum + item.subtotal , 0);
}

const handleCheckout = async()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/login');
      return
    }

  if(cart.length === 0){
    toast.error("cart is empty");
    return;
  }
  const data = {
    items: cart.map(({ _id, foodName, price, quantity, image }) => ({
      _id,
      foodName,
      price,
      quantity,
      image,
    })),
    totalToPay,
  };
  

  try {
    const res = await addCartToCheckout(data); 
    if(res.status === 201){

      toast.success("Cart added to Checkout successfully!"); // Clear cart after successful checkout
      navigate('/checkout');
    }
  } catch (error) {
    console.error("Checkout error:", error);
    toast.error("Failed to Checkout!");
  }


};


useEffect(()=>{
  const subTotal = calculateSubtotal();
  const total = cart.length > 0 ? subTotal - discount + deliveryCharge : 0;
  setTotalToPay(total);
},[cart]);

return (
    <div className={styles.product}>
      <Navbar />
      <div className={styles.product_main}>
        <div className={styles.product_banner}>
          <div className={styles.product_banner_left}>
            <p>I'm lovin' it!</p>
            <h1>McDonald’s East London</h1>
            <div>
              <span>
                <img src={checklist_banner_icon} alt="img" />
                <p>Minimum Order: 12 GBP</p>
              </span>
              <span>
                <img src={delivery_banner_icon} alt="img" />
                <p>Delivery in 20-25 Minutes</p>
              </span>
            </div>
          </div>
          <div className={styles.product_banner_right}>
            <img id={styles.ratings} src={ratings_banner_img} alt="img" />
            <img id={styles.burger_img} src={burger_banner_img} alt="img" />
          </div>
          <span className={styles.time_banner}>
            <img src={clock_banner_icon} alt="icon" />
            <p>Open until 3:00 AM</p>
          </span>
        </div>
        <div className={styles.product_main_offersConatiner}>
          <h2>All Offers from McDonald’s East London</h2>
          <span>
            <img src={search_icon} alt="icon" />
            <input type="text" placeholder="Search from menu..." />
          </span>
        </div>
      </div>
      <div className={styles.product_navContainer}>
        <p id={styles.active_bar_offers}> Offers</p>
        <p>Burgers</p>
        <p>Fries</p>
        <p>Snacks</p>
        <p>Salads</p>
        <p>Cold drinks </p>
        <p>Happy Meal® </p>
        <p>Desserts</p>
        <p> Hot drinks</p>
        <p>Sauces</p>
        <p>Orbit®</p>
      </div>
      <div className={styles.product_foodItemsConainer}>
     <ProductCards addToCart={addToCart} />
    {
      isCartVisible && <Cart cart={cart}
        removeFromCart={removeFromCart}
        discount={discount}
        deliveryCharge={deliveryCharge}
        totalToPay={totalToPay}
        calculateSubtotal = {calculateSubtotal}
        handleCheckout={handleCheckout}
        />

    }
    
      </div>
      <div className={styles.product_service_map_Container}>
      <ServiceInfo/>
      <Map/>
      </div>
      <CustomerReviews/>
      <div className={styles.similarRestaurant}>
        <h2>Similar Restaurants</h2>
        <Restaurants/>
      </div>
      <Footer/>
    
    </div>
  );
}

export default Product;

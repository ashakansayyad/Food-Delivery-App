import React,{useState,useEffect} from "react";
import map_icon from "../../assets/map_icon.svg";
import cart_icon from "../../assets/cart_icon.svg";
import down_arrow from "../../assets/cart_down_arrow.svg";
import app_logo from '../../assets/app_logo.svg';
import user_icon from '../../assets/user_icon.svg';
import styles from "./Navbar.module.css";
import { useNavigate,useLocation } from "react-router-dom";
import { getUserData } from "../../apis/user";

function Navbar() {
  const [userName,setUserName] = useState("");
  const [userAddress,setUserAddress]= useState([]);
  const [isActive,setIsActive] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUserName = async()=>{
    try{
        const res = await getUserData();
        if(res && res.data){
          setUserName(res.data.user.name);
          setUserAddress(res.data.user.addresses);
        }
    }catch(err){
        console.error("Error occured while fetching userName",err);
    }
  }
  const address = userAddress?.find((item)=> item.isDefault === true);
  const handleActive = (active, route) => {
    navigate(route);
    setIsActive(active); 
  };

  useEffect(()=>{
    fetchUserName();
  },[]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_top}>
        <div className={styles.navbar_top_promocode}>
          <p>🌟</p>
          <p>Get 5% Off your first order, Promo: ORDER5</p>
        </div>
        <div className={styles.navbar_right_container}>
          <div className={styles.navbar_top_address}>
            <img src={map_icon} alt="m" />
           

               {address && <p>{address.address}</p> }
            
            <p id={styles.location}>Change Location</p>
          </div>
          <div onClick={()=>navigate('/product')} className={styles.navbar_top_cartContainer}>
            <span>
              <img src={cart_icon} alt="cart" />
              <p>My Cart</p>
            </span>
            <img src={down_arrow} alt="arr" />
          </div>
        </div>
      </div>
      <div className={styles.navbar_bottom}>
        <img  id={styles.app_logo} src={app_logo} alt="logo" />
        <nav>
        <p
            className={`${location.pathname === "/" ? styles.active : ""}`}
            onClick={() => navigate('/')}
          >Home </p>
          <p>Browse Menu</p> 
          <p>Special Offers</p>
           <p
           className={`${location.pathname === "/product" ? styles.active : ""}`}
            onClick={()=>navigate('/product')}>Restaurants</p>
           <p>Track Order</p>     
          <button onClick={()=>navigate('/profile')}> <img src={user_icon} alt="icon" /> {token && userName ? userName : "Login/Signup" } </button>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;

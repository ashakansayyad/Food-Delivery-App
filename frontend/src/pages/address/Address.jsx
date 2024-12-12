import React, { useState, useContext, useEffect } from "react";
import styles from "./Address.module.css";
import left_arrow from "../../assets/checkout_left_arrow.svg";
import Navbar from "../../components/navbar/Navbar";
import add_address_icon from "../../assets/add_address_icon.svg";
import Footer from "../../components/footer/Footer";
import { ModalContext } from "../../context/Modal";
import AddressModal from "../../components/addressModal/AddressModal";
import { getUserData } from "../../apis/user";
import { useNavigate } from "react-router-dom";
function Address() {
  const { addAddressModal, setAddAddressModal } = useContext(ModalContext);
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const toggleModal = () => {
    setAddAddressModal(!addAddressModal);
  };

  const fetchAddresses = async () => {
    try {
      const res = await getUserData();
      if (res && res.data) {
        setUserName(res.data.user.name);
        setPhoneNo(res.data.user.phone);
        setAddresses(res.data.user.addresses || []);
        console.log("Fetched addresses:", res.data);
      }
    } catch (err) {
      console.error("Error occurred while fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    console.log("Address state:", addresses);
  }, []);

  return (
    <div className={styles.address}>
      <Navbar />

      <div className={styles.address_main_Container}>
        <div className={styles.address_main_Container_header}>
          <img src={left_arrow} onClick={()=>navigate('/checkout')} style={{cursor:"pointer"}} alt="Back" />
          <h2>Your Addresses</h2>
        </div>
        <div className={styles.address_main_Container_footer}>
          <div className={styles.add_address}>
            <span>
              <img onClick={toggleModal} src={add_address_icon} alt="Add Address" />
            </span>
            <p>Add Address</p>
          </div>

         
          {addresses.length > 0 ? (
            addresses.map((item, index) => (
              <div key={index} className={styles.show_add}>
               
                <div id={styles.username}>
                  <p id={styles.userTitle}>{userName}</p>
                  {item.isDefault && <p id={styles.default}>Default</p>}
                </div>

             
                <div id={styles.userAdd}>
                  <p>{item.address}</p>
                </div>

                
                <p id={styles.userMobile}>Phone Number: {phoneNo}</p>

             
                <div id={styles.editRemove}>
                  <p style={{ cursor: "pointer" }}>Edit</p>
                  <p>|</p>
                  <p style={{ cursor: "pointer" }}>Remove</p>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses found. Please add an address.</p>
          )}
        </div>
      </div>

      <Footer />
      {addAddressModal && <AddressModal />}
    </div>
  );
}

export default Address;

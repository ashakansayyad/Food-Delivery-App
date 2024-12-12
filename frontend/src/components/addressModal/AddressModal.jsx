import React,{useState,useContext} from 'react'
import styles from './AddressModal.module.css';
import { ModalContext } from '../../context/Modal';
import map_icon from '../../assets/address_moda_map_icon.svg';
import down_arrow from '../../assets/address_modal_arrow_down.svg';
import { addAddress } from '../../apis/user';
import { toast } from "react-toastify";
function AddressModal() {
  const { addAddressModal, toggleModal} = useContext(ModalContext);
  const [address,setAddress] = useState("");

  const saveAddress =async()=>{
    try{
      if (!address.trim()) {
        toast.error("Address cannot be empty");
        return;
      }
      const res = await addAddress({address});
      if (res && res.status === 200) {
        toast.success("Address added successfully");
        setAddress(""); 
        toggleModal();
        location.reload();
      }
    } catch (error) {
      if (error.response?.status) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

    
  return (
    <>
    {addAddressModal && (
      <div className={styles.container}>
        <div className={styles.overlay} onClick={ toggleModal}></div>
        <div className={styles.modalContent}>
          <span className={styles.modalContent_header}>
            <img src={map_icon} />
            <p>Add Address</p>
          </span>
          <div className={styles.titleConatiner}>
            <span id={styles.state}>
              <p>State</p>
              <img src={down_arrow}  />
            </span>
            <span  id={styles.city}>
              <p>City/District</p>
            </span>
            <span  id={styles.pincode}>
              <p>Pin Code</p>
            </span>
            <span  id={styles.phone_number}>
              <p>Phone Number</p>
            </span>
          </div>
          <textarea
          onChange={(e)=>setAddress(e.target.value)}
          placeholder='Enter full address'></textarea>
          <div className={styles.save_btn}>
            <button onClick={saveAddress}>Save</button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default AddressModal

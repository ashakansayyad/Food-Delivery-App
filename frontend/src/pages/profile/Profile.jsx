import React, { useContext, useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import user_img from "../../assets/user_image.png";
import left_arrow from "../../assets/checkout_left_arrow.svg";
import card_icon from "../../assets/payment_method_icon.svg";
import edit_icon from "../../assets/edit_card_icon.svg";
import { ModalContext } from "../../context/Modal";
import add_icon from "../../assets/add_address_icon.svg";
import { useNavigate } from "react-router-dom";
import { getUserData, updateUserData } from "../../apis/user";
import { getAllDebitCards } from "../../apis/debitCard";
import DebitCardModal from "../../components/debitcardmodal/DebitCardModal";
import { toast } from "react-toastify";

function Profile() {
  const token = localStorage.getItem("token");
  const {
    addDebitCardModal,
    setAddDebitCardModal,
    setDebitCardId,
    isEdit,
    setIsEdit,
  } = useContext(ModalContext);
  const navigate = useNavigate();
  const [savedDebitCards, setSavedDebitCards] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });

  const fetchUserData = async () => {
    try {
      const res = await getUserData();
      if (res && res.data) {
        setUserData(res.data.user);
      }
    } catch (err) {
      console.error("Error occurred with fetching user data", err);
    }
  };
  const fetchDebitCards = async () => {
    try {
      const res = await getAllDebitCards();
      if (res && res.data) {
        setSavedDebitCards(res.data.cards);
        console.log("debitcards: ", res.data);
      } else {
        setSavedDebitCards([]); // Fallback to an empty array if no data is returned
      }
    } catch (err) {
      console.error("Error occurred while fetching debit cards", err);
      setSavedDebitCards([]); // Handle errors by setting an empty array
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setUpdatedData(userData);
    }
  };
  const handleSaveClick = async () => {
    try {
      const res = await updateUserData(updatedData);
      if (res.status === 200) {
        toast.success(res.data.message);
        setUserData(res.data.user);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      toast.error("Failed to update user data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  const handleEditCard = (cardId) => {
    console.log("cardId", cardId);
    setDebitCardId(cardId);
    setIsEdit(true); // Set to edit mode
    toggleModal();
  };

  const toggleModal = () => {
    setAddDebitCardModal(!addDebitCardModal);
    if (addDebitCardModal) {
      setDebitCardId(null);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchDebitCards();
  }, []);

  useEffect(() => {
    if(!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className={styles.profile}>
      <Navbar />
      <div className={styles.profile_mainConatiner}>
        <div className={styles.profile_mainConatiner_header}>
          <img
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            src={left_arrow}
            alt="f"
          />
          <h2>My Profile</h2>
        </div>
        <div className={styles.profile_mainConatiner_main}>
          <div className={styles.profile_mainConatiner_main_top}>
            <span>
              <img src={user_img} /> <p>{userData.name}</p>
            </span>
            <button onClick={isEditing ? handleSaveClick : handleEditClick}>
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.profile_mainConatiner_main_bottom}>
            <div className={styles.two_main_Container}>
              <div className={styles.profile_mainConatiner_main_bottom_left}>
                <span>
                  <p>Full Name</p>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? updatedData.name : userData.name}
                    onChange={isEditing ? handleInputChange : null}
                    disabled={!isEditing}
                  />
                </span>
                <span>
                  <p>Gender</p>
                  <input
                    type="text"
                    name="gender"
                    value={isEditing ? updatedData.gender : userData.gender}
                    onChange={isEditing ? handleInputChange : null}
                    disabled={!isEditing}
                  />
                </span>
              </div>
              <div className={styles.profile_mainConatiner_main_bottom_right}>
                <span>
                  <p>Email Address</p>
                  <input
                    type="email"
                    name="email"
                    value={isEditing ? updatedData.email : userData.email}
                    onChange={isEditing ? handleInputChange : null}
                    disabled={!isEditing}
                  />
                </span>
                <span>
                  <p>Country</p>
                  <input
                    type="text"
                    name="country"
                    value={isEditing ? updatedData.country : userData.country}
                    onChange={isEditing ? handleInputChange : null}
                    disabled={!isEditing}
                  />
                </span>
              </div>
            </div>
            <p id={styles.the_line}></p>
            <h3>Saved Payment Methods</h3>
            <div className={styles.payment_methodContainer}>
              {savedDebitCards.length > 0 ? (
                savedDebitCards.map((card) => (
                  <span key={card._id} className={styles.cardContainer}>
                    <span id={styles.imgSpan}>
                      <img src={card_icon} alt="card icon" />
                    </span>
                    <span id={styles.description}>
                      <p>{`xxxx xxxx xxxx ${card.cardNumber.slice(-4)}`}</p>
                      <p id={styles.username}>{card.nameOnCard}</p>
                    </span>
                    <img
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditCard(card._id)}
                      src={edit_icon}
                      alt="edit"
                    />
                  </span>
                ))
              ) : (
                <p>No saved debit cards found.</p>
              )}
              <div className={styles.addNewCard_container}>
                <span style={{ cursor: "pointer" }} onClick={toggleModal}>
                  <img src={add_icon} />
                </span>
                <p>Add New Card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {addDebitCardModal && (
        <DebitCardModal fetchDebitCards={fetchDebitCards} />
      )}
    </div>
  );
}

export default Profile;

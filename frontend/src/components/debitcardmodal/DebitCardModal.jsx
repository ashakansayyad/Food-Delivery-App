import React, { useState, useContext , useEffect} from "react";
import styles from "./DebitCardModal.module.css";
import { ModalContext } from "../../context/Modal";
import {
  addDebitCard,
  updateDebitCard,
  removeDebitCard,
  getSpeceficCard,
} from "../../apis/debitCard";
import { toast } from "react-toastify";
function DebitCardModal({ fetchDebitCards }) {
  const { addDebitCardModal, toggleDebitCardModal,isEdit,setIsEdit, debitCardId ,setDebitCardId } =
    useContext(ModalContext);
 
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiration: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const fetchCardDetails = async () => {
    try {
      const res = await getSpeceficCard(debitCardId);
      if (res && res.data) {
        setCardDetails(res.data.card);
        console.log(res.data)
      }
    } catch (err) {
      console.error("Error fetching card details:", err);
    }
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        await updateDebitCard(debitCardId, cardDetails);
        toast.success("Card updated successfully!");

      } else {
        await addDebitCard(cardDetails);
        toast.success("Card added successfully!");
      }
      fetchDebitCards();
      closeModal();
    } catch (err) {
      console.error("Error saving card details:", err);
      toast.error("Failed to save card details.");
    }
  };

  const handleDelete = async () => {
    try {
      await removeDebitCard(debitCardId);
      toast.success("Card deleted successfully!");
      fetchDebitCards();
      closeModal();
    } catch (err) {
      console.error("Error deleting card:", err);
      toast.error("Failed to delete card.");
    }
  };

  const closeModal = () => {
    toggleDebitCardModal()
    setDebitCardId(null);
    setIsEdit(false);
  };

  useEffect(() => {
    if (isEdit) {
      fetchCardDetails();
    }
  }, [isEdit, debitCardId]);

  useEffect(() => {
      
console.log("isEdit: ",isEdit)
console.log("debitCardId: ",debitCardId)
  }, []);

  return (
    <>
      {addDebitCardModal && (
        <div className={styles.container}>
          <div className={styles.overlay} onClick={toggleDebitCardModal}></div>
          <div className={styles.modalContent}>
            <div className={styles.modalContent_top}>
              <h3>{isEdit ? "Edit" : "Add"} Payment Method</h3>
              <span>
                <p>Card Number</p>
                <input
                  type="number"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <p>Expiration</p>
                <input
                  type="number"
                  name="expiration"
                  placeholder="Expiration Date"
                  value={cardDetails.expiration}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <p>CVC</p>
                <input
                  type="number"
                  name="cvc"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={handleInputChange}
                />
              </span>
              <span>
                <p>Name on Card</p>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on Card"
                  value={cardDetails.nameOnCard}
                  onChange={handleInputChange}
                />
              </span>
            </div>
            <div className={styles.modalContent_bottom}>
              {isEdit && (
                <button onClick={handleDelete} id={styles.remove}>
                  Remove
                </button>
              )}
              <span className={styles.buttonContainer}>
                <p onClick={toggleDebitCardModal}>Cancel</p>
                <button onClick={handleSave}>
                  {isEdit ? "Save Changes" : "Add Card"}
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DebitCardModal;

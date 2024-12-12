import { useState, createContext } from "react";

export const ModalContext = createContext();

export const Modal = ({ children }) => {

  const [addAddressModal, setAddAddressModal] = useState(false);
  
  const toggleModal = () => {
    setAddAddressModal(!addAddressModal);
  };
  const [addDebitCardModal, setAddDebitCardModal] = useState(false);
  
  const toggleDebitCardModal = () => {
    setAddDebitCardModal(!addDebitCardModal);
  };
  const [placedOrderItems,setPlacedOrderItems] = useState([]);

  const [isEdit,setIsEdit] = useState(null); 
  const [totalCartAmout,setTotalCartAmount]=useState('');
  const [debitCardId,setDebitCardId] = useState("");
  return (
    <ModalContext.Provider
      value={{
        addAddressModal,
        setAddAddressModal,
        toggleModal,
        totalCartAmout,
        setTotalCartAmount,
        addDebitCardModal, 
        setAddDebitCardModal,
        toggleDebitCardModal,
        debitCardId,
        setDebitCardId,
        isEdit,
        setIsEdit,
        placedOrderItems,
        setPlacedOrderItems
          
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
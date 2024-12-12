import React from "react";
import {
  Home,
  Login,
  Signup,
  Profile,
  Checkout,
  Payment,
  Product,
  Address,
  OrderSuccess,
  Notfound
} from "./pages/index";
import {BrowserRouter,Routes , Route} from 'react-router-dom';
import { Modal } from "./context/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <Modal>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "/login" element={<Login/>} />
        <Route path = "/signup" element={<Signup/>} />
        <Route path = "/profile" element={<Profile/>} />
        <Route path = "/checkout" element={<Checkout/>} />
        <Route path = "/address" element={<Address/>} />
        <Route path = "/payment" element={<Payment/>} />
        <Route path = "/product" element={<Product/>} />
        <Route path = "/ordersuccess" element={<OrderSuccess/>} />
        <Route path = "/*" element={<Notfound/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </Modal>
  );
}

export default App;

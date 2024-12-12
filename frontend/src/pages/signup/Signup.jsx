import React from "react";
import styles from "./Signup.module.css";
import register_img from "../../assets/main_login_img.png";
import app_logo from "../../assets/app_logo.svg";
import Footer from "../../components/footer/Footer";
import pwdViewIcon from "../../assets/view_pwd.png";
import pwdHideIcon from "../../assets/hide_pwd.png";
import { useState } from "react";
import {signup} from '../../apis/user';
import Form from "../../components/form/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
  });

  // fields with validation
  const formFields = [
    {
      name: "name",
      type: "text",
      label:"Name",
      placeholder: "eg. John A",
      value: formData.name,
      onChange: (e) => {
        setFormData({ ...formData, name: e.target.value });
        setError({ ...error, name: false });
      },
    },
    {
      name: "phone",
      type: "number",
      maxLength: 10,
      label:"Phone Number",
      placeholder: "Enter your 10 digit mobile number",
      value: formData.phone,
      onChange: (e) => {
        setFormData({ ...formData, phone: e.target.value });
        setError({ ...error, phone: false });
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Example@email.com",
      value: formData.email,
      onChange: (e) => {
        setFormData({ ...formData, email: e.target.value });
        setError({ ...error, email: false });
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      vicon: pwdViewIcon,
      hicon: pwdHideIcon,
      placeholder: "At least 8 characters",
      value: formData.password,
      onChange: (e) => {
        setFormData({ ...formData, password: e.target.value });
        setError({ ...error, password: false });
      },
    },
  ];

  const errorMessage = {
    name: { message: "Name is required!" },
    email: { message: "Email is required!" },
    password: { message: "Password is required!" },
    phone: { message: "Phone is required!" },
  };

  // Password validation regex
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Email validation regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //name validation
  const namePattern = /^[a-zA-Z\s]*$/;

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!formData.name) {
      setError((prev) => ({ ...prev, name: true }));
      isError = true;
    } else if (!namePattern.test(formData.name)) {
      toast.error("Name can only contain alphabets.", { theme: "colored" });
      isError = true;
    }

    if (!formData.email) {
      setError((prev) => ({ ...prev, email: true }));
      isError = true;
    } else if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.", { theme: "colored" });
      isError = true;
    }
    if (!formData.phone) {
      setError((prev) => ({ ...prev, phone: true }));
      isError = true;
    }else if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.", { theme: "colored" });
      isError = true;
    }

    if (!formData.password) {
      setError((prev) => ({ ...prev, password: true }));
      isError = true;
    } else if (!passwordPattern.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, lowercase letter, symbol, and a number.",
        {
          theme: "colored",
        }
      );
      isError = true;
    }

    if (!isError) {
      try {
        const { name, phone,email, password } = formData;
        const userData = { name,phone,  email, password };

        const res = await signup(userData);
        if (res.status === 201) {
          toast.success("User registered successfully!", { theme: "colored" });
          navigate("/login");
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message, { theme: "colored" });
        } else {
          console.error(err.response);
        }
      }
    }
  };
  return (
    <div className={styles.signup}>
      <div className={styles.signup_header}>
        <div className={styles.signup_header_left}>
          <header>
            <div>
              <img src={app_logo} alt="logo" />
            </div>
            <h2>Welcome 👋</h2>
            <p>
              Today is a new day. It's your day. You shape it.<br/> Sign in to start
              ordering.
            </p>
          </header>
          <Form
            formFields={formFields}
            error={error}
            errorMessage={errorMessage}
            handleSubmit={handleSignupSubmit}
            isSignup={true}
          />
          <footer className={styles.signup_header_footer}>
            <p>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")}>Sign in</button>
            </p>
          </footer>
        </div>
        <div className={styles.signup_header_right}>
          <img src={register_img} alt="img" />
        </div>
      </div>
    
        <Footer />
     
    </div>
  );
}

export default Signup;

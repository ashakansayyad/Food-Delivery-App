import React from "react";
import styles from "./Login.module.css";
import register_img from "../../assets/main_login_img.png";
import app_logo from "../../assets/app_logo.svg";
import Footer from "../../components/footer/Footer";
import pwdViewIcon from "../../assets/view_pwd.png";
import pwdHideIcon from "../../assets/hide_pwd.png";
import { useState ,useEffect} from "react";
import { login } from "../../apis/user";
import Form from "../../components/form/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[])
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const formFields = [
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
    email: { message: "Email is required!" },
    password: { message: "Password is required!" },
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!formData.email) {
      setError((prev) => ({ ...prev, email: true }));
      isError = true;
    }
    if (!formData.password) {
      setError((prev) => ({ ...prev, password: true }));
      isError = true;
    }

    if (!isError) {
      try {
        const res = await login(formData);
        if (res.status === 200) {
          toast.success("Logged in Successfully!", { theme: "colored" });
          const token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
          location.reload();
        } else {
          toast.error("Something went wrong", { theme: "colored" });
        }
      } catch (error) {
        if (error.response.status === 400) {
          toast.error(error.response.data.message, { theme: "colored" });
        }
      }
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login_header}>
        <div className={styles.login_header_left}>
          <header>
            <div>
              <img src={app_logo} alt="logo" />
            </div>
            <h2>Welcome Back 👋</h2>
            <p>
              Today is a new day. It's your day. You shape it.
              <br /> Sign in to start ordering.
            </p>
          </header>
          <Form
            formFields={formFields}
            error={error}
            errorMessage={errorMessage}
            handleSubmit={handleLoginSubmit}
            isLogin={true}
          />
          <footer className={styles.login_header_footer}>
            <p>
              Don't you have an account?{" "}
              <button onClick={() => navigate("/signup")}>Sign up</button>
            </p>
          </footer>
        </div>
        <div className={styles.login_header_right}>
          <img src={register_img} alt="img" />
        </div>
      </div>
    
        <Footer />
   
    </div>
  );
}

export default Login;

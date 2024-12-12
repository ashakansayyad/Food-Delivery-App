import React from "react";
import styles from "./Form.module.css";
import { useState } from "react";
const InputFields = ({
  name,
  type,
  value,
  placeholder,
  onChange,
  label,
  vicon,
  hicon,
}) => {
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const handlePasswordVisible = () => {
    setIsPwdVisible(!isPwdVisible);
  };
  const inputType = type === "password" && isPwdVisible ? "text" : type;

  return (
    <div className={styles.inputContainer}>
     <label htmlFor="name" className={styles.inputlabel}>
      {label}
     </label>
      <input
        className={styles.inputField}
        type={inputType}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      {type === "password" && (
        <img
          className={styles.iconToggle}
          src={isPwdVisible ? hicon : vicon}
          onClick={handlePasswordVisible}
          alt=""
        />
      )}
    </div>
  );
};

function Form({
  formFields,
  error = {},
  errorMessage = {},
  handleSubmit,
  isSignup,
  isLogin,
}) {
  return (
    <form className={styles.form}>
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          <InputFields
            name={field.name}
            key={index}
            type={field.type}
            value={field.value}
            label={field.label}
            placeholder={field.placeholder}
            onChange={field.onChange}
            vicon={field?.vicon}
            hicon={field?.hicon}
          />
          {error?.[field.name] ? (
            <p id={styles.error}>{errorMessage?.[field.name]?.message}</p>
          ) : null}
        </React.Fragment>
      ))}

      <button type="submit" onClick={handleSubmit}>
        {isSignup ? "Continue" : isLogin ? "Login" : "Update"}
      </button>
    </form>
  );
}

export default Form;

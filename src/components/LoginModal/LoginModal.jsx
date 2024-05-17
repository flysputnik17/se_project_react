import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, handleLogin, handleSignUpButtonClick }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };
  return (
    <ModalWithForm
      buttonText="Log in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      titleText="Log In"
    >
      <div className="login">
        <label htmlFor="email" className="modal__label">
          Email:
        </label>
        <input
          id="email"
          className="modal__input"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="modal__label">
          Password:
        </label>
        <input
          id="password"
          className="modal__input"
          name="password"
          type="text"
          value={data.password}
          onChange={handleChange}
          required
        />

        <div className="login__button-container"></div>
        <div className="login__signin">
          <button
            className="register__login-link"
            type="button"
            onClick={handleSignUpButtonClick}
          >
            or Sign Up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

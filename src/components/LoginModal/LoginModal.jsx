import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  isOpen,
  handleLogin,
  handleSignUpButtonClick,
  onClose,
}) => {
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
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      titleText="Log In"
      className="login"
      buttonText="Sign up"
      buttonText2="or Log In"
    >
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
      <button type="submit" className="Login__button">
        Login
      </button>
      <button
        type="button"
        className="Or-Sign-Up__button"
        onClick={handleSignUpButtonClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;

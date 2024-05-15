import { Link } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, handleLogin }) {
  const [data, setData] = useState({
    username: "",
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
    <ModalWithForm isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="login">
        <p className="login__welcome">Please Login.</p>

        <label htmlFor="username" className="modal__label">
          Username:
        </label>
        <input
          id="username"
          className="modal__input"
          name="username"
          type="text"
          value={data.username}
          onChange={handleChange}
        />

        <label htmlFor="password" className="modal__label">
          Password:
        </label>
        <input
          id="password"
          className="modal__input"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />

        <div className="login__button-container">
          <button type="submit" className="modal__add-button">
            Log in
          </button>
        </div>
        <div className="login__signin">
          <p>Dont have acount?</p>
          <Link to="/register" className="register__login-link">
            Sign up here
          </Link>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;

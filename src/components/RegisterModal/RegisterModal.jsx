import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

const RegisterModal = ({ isOpen, handleRegistration }) => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // This function fires whenever an input is changed, and it updates
  // the value of the changed input. Note that the keys of this
  // object match the name attributes of the corresponding inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Declare a submission handler function. This function just needs
  // to prevent the default browser behavior, and call
  // handleRegistration, passing it the data from the form
  // submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm isOpen={isOpen} onSubmit={handleSubmit}>
      <div className="register">
        <p className="register__welcome">Please register.</p>
        <label htmlFor="username" className="modal__label">
          Username:
        </label>
        <input
          id="username"
          name="username"
          className="modal__input"
          type="text"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="email" className="modal__label">
          Email:
        </label>
        <input
          id="email"
          name="email"
          className="modal__input"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="modal__label">
          Password:
        </label>
        <input
          className="modal__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword" className="modal__label">
          Confirm password:
        </label>
        <input
          className="modal__input"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="modal__add-button">
            Sign up
          </button>
        </div>
        <div className="register__signin">
          <p>Already a member?</p>
          <Link to="/login" className="register__login-link">
            Log in here
          </Link>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

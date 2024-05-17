import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./RegisterModal.css";

const RegisterModal = ({
  isOpen,
  handleRegistration,
  handleLoginButtonClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    avatar: "",
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
    <ModalWithForm buttonText="Sign Up" isOpen={isOpen} onSubmit={handleSubmit}>
      <p className="modal__title">Sign Up</p>
      <label htmlFor="Email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          className="modal__input"
          id="password"
          name="password"
          type="text"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="Name" className="modal__label">
        Name*
        <input
          id="username"
          name="username"
          className="modal__input"
          type="text"
          placeholder="Name"
          value={data.username}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="Avatar URL *" className="modal__label">
        Avatar URL *
        <input
          id="avatar"
          name="avatar"
          className="modal__input"
          type="url"
          placeholder="Avatar URL "
          value={data.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <button
        className="register__login-link"
        type="button"
        onClick={handleLoginButtonClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;

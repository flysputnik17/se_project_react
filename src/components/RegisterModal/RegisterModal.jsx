import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  handleRegistration,
  handleLoginButtonClick,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  // Declare a submission handler function. This function just needs
  // to prevent the default browser behavior, and call
  // handleRegistration, passing it the data from the form
  // submission.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      titleText="Sign Up"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
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
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="name"
          name="name"
          className="modal__input"
          type="text"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          id="avatar"
          name="avatar"
          className="modal__input"
          type="url"
          placeholder="Avatar URL "
          value={avatar}
          onChange={handleAvatarChange}
          minLength={1}
          required
        />
      </label>
      <button type="submit" className="SignUp__button">
        Sign up
      </button>
      <button
        type="button"
        className="Or-Login__button"
        onClick={handleLoginButtonClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;

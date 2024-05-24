import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, handleEdit, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const [data, setData] = useState({
    username: "",
    avatar: "",
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
    handleEdit(data);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      titleText="Change profile data"
      className="login"
      buttonText="Save changes"
      onClose={onClose}
    >
      <label htmlFor="Name *" className="modal__label">
        Name *
      </label>
      <input
        id="username"
        className="modal__input"
        name="username"
        type="text"
        value={data.username}
        onChange={handleChange}
        minLength="1"
        maxLength="30"
        placeholder={currentUser.username}
        required
      />

      <label htmlFor="Avatar URL *" className="modal__label">
        Avatar *
      </label>
      <input
        id="avatar"
        className="modal__input"
        name="avatar"
        type="url"
        value={data.avatar}
        onChange={handleChange}
        minLength={1}
        placeholder={currentUser.avatar}
        required
      />
      <button type="submit" className="Login__button">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;

import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, handleEdit, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setUrl] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    setName(currentUser?.name);
    setUrl(currentUser?.avatar);
  }, [currentUser?.name, currentUser?.avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit({ name, avatar });
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
      <label htmlFor="name" className="modal__label">
        Name *
      </label>
      <input
        id="name"
        className="modal__input"
        name="name"
        type="text"
        value={name}
        onChange={handleNameChange}
        minLength="1"
        maxLength="30"
        placeholder={currentUser.name}
        required
      />

      <label htmlFor="avatar" className="modal__label">
        Avatar *
      </label>
      <input
        id="avatar"
        className="modal__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={handleUrlChange}
        minLength={1}
        placeholder={currentUser.avatar}
        required
      />
      <button type="submit" className="editButton">
        Save changes
      </button>
    </ModalWithForm>
  );
};

export default EditProfileModal;

import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, closeActiveModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [link, setImage] = useState("");
  // const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  // create onChange handlers corresponding to each state variable

  return (
    <>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        onClose={closeActiveModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <>
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              name="name"
              value={name}
              className="modal__input"
              id="name"
              placeholder="Name"
              onChange={handleNameChange}
              required
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image
            <input
              type="url"
              name="link"
              className="modal__input"
              value={link}
              id="imageURL"
              placeholder="image URL"
              onChange={handleImageChange}
              required
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__radio-button-title">
              Select the weather type:
            </legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              Hot
              <input
                type="radio"
                className="modal__radio-input"
                id="hot"
                name="radioButton"
                value="hot"
              />
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              Warm
              <input
                type="radio"
                className="modal__radio-input"
                id="warm"
                name="radioButton"
                value="warm"
              />
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              Cold
              <input
                type="radio"
                className="modal__radio-input"
                id="cold"
                name="radioButton"
                value="cold"
              />
            </label>
          </fieldset>
        </>
      </ModalWithForm>
    </>
  );
};

export default AddItemModal;

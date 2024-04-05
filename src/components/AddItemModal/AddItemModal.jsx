import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  // create onChange handlers corresponding to each state variable

  return (
    <ModalWithForm
      buttonText="Add garment"
      titleText="New garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
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
          name="imageUrl"
          className="modal__input"
          value={imageUrl}
          id="imageUrl"
          placeholder="image URL"
          onChange={handleImageChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__radio-button-title">
          Select the weather type:
        </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          Hot
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="radioButton"
            value="hot"
            onChange={handleWeatherChange}
          />
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          Warm
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="radioButton"
            value="warm"
            onChange={handleWeatherChange}
          />
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          Cold
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="radioButton"
            value="cold"
            onChange={handleWeatherChange}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;

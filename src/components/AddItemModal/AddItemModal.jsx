import React from "react"
import ModalWithForm from "../ModalWithForm/ModalWithForm"

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // declare state for each input field

  // use a useEffect hook to reset the input field state to empty strings when 
  // the modal is opened

  // create onChange handlers corresponding to each state variable

  function handleSubmit(e) {
    // prevent default behavior
    // call onAddItem with appropriate arguments
  }

  return (
    {/* don't forget to pass appropriate props to ModalWithForm */}
    <ModalWithForm
          buttonText="Add garment"
          titleText="New garment"
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
        >
          <><label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              required
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="imageURL"
              placeholder="image URL"
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
          </fieldset></>
        </ModalWithForm>
  );
};

export default AddItemModal;
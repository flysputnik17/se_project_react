import { useState } from "react";
import "./App.css";
import Header from "../Header/Header.jsx";
import GetWeather from "../../utils/WeatherApi";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header currentLocation={GetWeather} handleAddClick={handleAddClick} />
        <Main />
        <Footer />
      </div>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        activeModal={activeModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imagURL" className="modal__label">
          Image
          <input
            type="url"
            className="modal__input"
            id="imageURL"
            placeholder="image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__radio-button-title">
            Select the weather type:
          </legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
            <input type="radio" className="modal__radio-input" id="hot" />
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
            <input type="radio" className="modal__radio-input" id="warm" />
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
            <input type="radio" className="modal__radio-input" id="cold" />
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;

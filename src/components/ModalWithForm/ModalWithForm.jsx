import "./ModalWithForm.css";
import closeButton from "../../assets/closeButton.svg";

function ModalWithForm({ children, buttonText, titleText, onClose, isOpen }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h1 className="modal__title">{titleText}</h1>
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeButton}></img>
        </button>
        <form className="modal__form">
          {children}
          <button className="modal__add-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

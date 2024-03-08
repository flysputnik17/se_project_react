import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, titleText, activeModal }) => {
  return (
    <div
      className={`modal ${activeModal === "add-garment" && "modal__opened"}`}
    >
      <div className="modal__content">
        <h1 className="modal__title">{titleText}</h1>
        <button className="modal__close-button">CLOSE</button>
        <form className="modal__form">
          {children}
          <button className="modal__add-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;

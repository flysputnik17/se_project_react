import "./ConfirmationModal.css";
import closeButton from "../../assets/closeButton.svg";
const ConfirmationModal = ({ onClose, activeModal, onDelete }) => {
  return (
    <div
      className={`modal ${activeModal === "confirmation" && "modal_opened"}`}
    >
      <div className="confirmationModal">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>
        <img src={closeButton} alt="close button"></img>
        <div className="confirmationModal__buttons">
          <p className="confirmation_text">
            Are you sure you want to delete this item? This action is
            irreversible
          </p>
          <button
            type="button"
            className="confirmation__deleteButton"
            onClick={onDelete}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirmation__cancelButton"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

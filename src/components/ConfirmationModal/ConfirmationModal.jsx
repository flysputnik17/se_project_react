import "./ConfirmationModal.css";
import closeButton from "../../assets/closeButton.svg";
const ConfirmationModal = ({ onClose, activeModal, onDelete, card }) => {
  return (
    <div
      className={`modal ${activeModal === "confirmation" && "modal_opened"}`}
    >
      <div className="confirmationModal">
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeButton} alt="close button"></img>
        </button>

        <div className="confirmationModal__main">
          <p className="confirmationModal__main-text">
            Are you sure you want to delete this item?
            <br /> This action is irreversible
          </p>
          <button
            type="button"
            className="confirmationModal__main-deleteButton"
            onClick={() => {
              onDelete(card);
            }}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirmationModal__main-cancelButton"
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

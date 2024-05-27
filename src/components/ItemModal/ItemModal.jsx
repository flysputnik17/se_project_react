import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, handleConfirmationClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id && currentUser._id !== undefined;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className=" modal__content_type_image">
        <button type="button" className="modal__close-button" onClick={onClose}>
          <img src={closeButton} alt="close button"></img>
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__footer-info-caption">{card.name}</h2>
            <p className="modal__footer-info-weather">
              Weather: {card.weather}
            </p>
          </div>

          <button
            className={itemDeleteButtonClassName}
            type="button"
            onClick={() => {
              handleConfirmationClick();
            }}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

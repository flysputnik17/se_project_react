import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
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
            className="modal__delete-button"
            type="button"
            onClick={() => {
              onDelete(card);
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

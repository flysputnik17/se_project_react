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
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
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

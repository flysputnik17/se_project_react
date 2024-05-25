import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ onCardClick, item, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const id = item._id;
  const isLiked = item.likes.some((user) => user === currentUser?._id);
  const likeButtonClass = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(id, isLiked);
  };

  return (
    <div className="cardSection__card">
      <div>
        <img
          className="cardSection__card-img"
          src={item.imageUrl}
          alt={item.name}
          onClick={handleCardClick}
        ></img>
      </div>

      <div className="cardSection_card-title">
        {item.name}
        <button
          type="button"
          className={likeButtonClass}
          onClick={handleLike}
        ></button>
      </div>
    </div>
  );
}

export default ItemCard;

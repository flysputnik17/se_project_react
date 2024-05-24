import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ onCardClick, item, handleCardLike }) {
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
    handleCardLike(id, isLiked);
  };

  return (
    <li className="cardSection__card">
      <h2 className="cardSection__card-title">{item.name}</h2>
      <img
        className="cardSection__card-img"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      ></img>
      <button
        type="button"
        className={likeButtonClass}
        onClick={handleLike}
      ></button>
    </li>
  );
}

export default ItemCard;

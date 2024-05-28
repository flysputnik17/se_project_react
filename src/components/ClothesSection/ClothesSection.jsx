import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  onClick,
  clothingItems,
  onCardClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = clothingItems.owner === currentUser._id;
  const cardSectionClassName = `cardSection__cardList ${
    isOwn ? "cardSection__cardList_visible" : "cardSection__cardList_hidden"
  }`;
  return (
    <section className="profile__cardSection">
      <div className="profile__cardSection-text">
        <p className="profile__cardSection-text-title">Your items</p>
        <button
          type="button"
          className="profile__cardSection-text-button"
          onClick={onClick}
        >
          + Add new
        </button>
      </div>

      <ul className={cardSectionClassName}>
        {clothingItems.map((item) => {
          const isOwn = item.owner === currentUser?._id;
          if (isOwn) {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
              />
            );
          } else {
            return null;
          }
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick, onClick }) {
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

      <ul className="cardSection__cardList">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;

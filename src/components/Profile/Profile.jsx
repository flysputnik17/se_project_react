import "./Profile.css";
import avatar from "../../assets/avatar.svg";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function Profile({ handleCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <div className="profile__userSection">
        <img
          className="profile__userSection-avatar"
          src={avatar}
          alt="avatar"
        />
        <p className="profile__userSection-title">Pavel Bandurin</p>
      </div>
      <section className="profile__cardSection">
        <div className="profile__cardSection-text">
          <p className="profile__cardSection-text-title">Your items</p>
          <button
            type="button"
            className="profile__cardSection-text-button"
            onClick={handleAddClick}
          >
            + Add new
          </button>
        </div>

        <ul className="cardSection__cardList">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default Profile;

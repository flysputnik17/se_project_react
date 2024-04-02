import "./Profile.css";
// import avatar from "../../assets/avatar.svg";
// import { defaultClothingItems } from "../../utils/constants";
// import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection onCardClick={handleCardClick} onClick={handleAddClick} />
    </div>
  );
}

export default Profile;

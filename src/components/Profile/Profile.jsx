import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, handleAddClick, clothingItems }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onCardClick={handleCardClick}
        onClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;

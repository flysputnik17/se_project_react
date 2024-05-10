import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  userData,
  setIsLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar userData={userData} setIsLoggedIn={setIsLoggedIn} />
      <ClothesSection
        onCardClick={handleCardClick}
        onClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;

import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  signOut,
  handleEditModal,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar signOut={signOut} handleEditModal={handleEditModal} />
      <ClothesSection
        onCardClick={handleCardClick}
        onClick={handleAddClick}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;

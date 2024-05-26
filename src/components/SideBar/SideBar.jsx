import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ signOut, handleEditModal }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile__userSection">
      <div>
        {currentUser.avatar === "" ? (
          <img
            className="profile__userSection-avatar"
            src={currentUser.avatar}
            alt="avatar"
          />
        ) : (
          <div className="profile__span-container">
            <span className="profile__span">
              {currentUser.name.toUpperCase().charAt(0) || ""}
            </span>
          </div>
        )}
      </div>

      <p className="profile__userSection-title">{currentUser.name}</p>
      <button
        className="profile__userSection-button"
        type="button"
        onClick={handleEditModal}
      >
        Change profile data
      </button>
      <button
        className="profile__userSection-logout"
        type="button"
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;

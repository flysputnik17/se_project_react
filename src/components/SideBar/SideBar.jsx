import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ signOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile__userSection">
      <img
        className="profile__userSection-avatar"
        src={currentUser.avatar}
        alt="avatar"
      />
      <p className="profile__userSection-title">{currentUser.username}</p>
      <p className="profile__userSection-email">{currentUser.email}</p>
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

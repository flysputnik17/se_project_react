import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar({ userData, signOut }) {
  return (
    <div className="profile__userSection">
      <img className="profile__userSection-avatar" src={avatar} alt="avatar" />
      <p className="profile__userSection-title">{userData.username}</p>
      <p className="profile__userSection-email">{userData.email}</p>
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

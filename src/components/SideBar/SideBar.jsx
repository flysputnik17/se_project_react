import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="profile__userSection">
      <img className="profile__userSection-avatar" src={avatar} alt="avatar" />
      <p className="profile__userSection-title">Pavel Bandurin</p>
    </div>
  );
}

export default SideBar;

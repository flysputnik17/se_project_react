import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, isLoggedIn, userData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (isLoggedIn === false) {
    return (
      <header className="header">
        <div className="header__app">
          <Link to="/" className="header__app-logo"></Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <div className="header__app">
          <Link to="/" className="header__app-logo"></Link>
          <h1 className="header__app-text">
            {currentDate},{weatherData.city}
          </h1>
        </div>
        <div className="header__user">
          <ToggleSwitch />
          <button
            className="header__user-button"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__user-title">
            {userData.username}
          </Link>
          <img className="header__user-avatar" src={avatar} alt="avatar"></img>
        </div>
      </header>
    );
  }
}

export default Header;

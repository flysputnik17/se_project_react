import logo from "../../assets/WTWR.svg";
import avatar from "../../assets/avatar.svg";
import "./Header.css";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header__app">
        <img className="header__app-logo" src={logo} alt="logo"></img>
        <h1 className="header__app-text">
          {currentDate},{weatherData.city}
        </h1>
      </div>
      <div className="header__user">
        <button
          className="header__user-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <h2 className="header__user-title">Pavel Bandurin</h2>
        <img className="header__user-avatar" src={avatar} alt="avatar"></img>
      </div>
    </div>
  );
}

export default Header;

import logo from "../../assets/WTWR.svg";
import avatar from "../../assets/avatar.svg";
import "./header.css";

const Header = () => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <div className="header_app">
        <img className="header_app-logo" src={logo} alt="logo"></img>
        <h1 className="header_app-text">{currentDate}</h1>
      </div>
      <div className="header_user">
        <button className="header_user-button">+ Add clothes</button>
        <h2 className="header_user-title">Pavel Bandurin</h2>
        <img className="header_user-avatar" src={avatar} alt="avatar"></img>
      </div>
    </div>
  );
};

export default Header;

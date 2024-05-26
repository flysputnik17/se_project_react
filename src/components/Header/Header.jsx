import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleRigsterModal,
  handleLoginModal,
  weatherData,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__app">
        <Link to="/" className="header__app-logo"></Link>
        <h1 className="header__app-text">
          {currentDate},{weatherData.city}
        </h1>
        <div className="header__user">
          <ToggleSwitch />
          {isLoggedIn ? (
            <>
              <button
                className="header__user-button"
                type="button"
                onClick={handleAddClick}
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__user-title">
                {currentUser.name}
              </Link>
              <div>
                {currentUser.avatar === "" ? (
                  <img
                    className="header__user-avatar"
                    src={currentUser.avatar}
                    alt="avatar"
                  />
                ) : (
                  <div className="header__span-container">
                    <span className="header__span">
                      {currentUser.name?.toUpperCase().charAt(0) || ""}
                    </span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="header__app-signUp"
                onClick={handleRigsterModal}
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="header__app-logIn"
                onClick={handleLoginModal}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

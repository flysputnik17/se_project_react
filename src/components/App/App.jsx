import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.JSX";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import Api from "../../utils/api.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import Auth from "../../utils/auth.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});
const auth = new Auth({ headers: { "Content-Type": "application/json" } });

function App() {
  const [weatherData, setWeatherData] = useState(
    {
      type: "",
      temp: {
        F: 999,
        C: 999,
      },
      city: "",
    },
    []
  );

  const [activeModal, setActiveModal] = useState(""); //react hook  activeModal is the inital value and setActive is the functino that let you change the value
  const [selectedCard, setSelectCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    _id: "",
  });

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRigsterModal = () => {
    setActiveModal("signUp");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleAddItemSubmit = (values) => {
    api
      .addNewItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(`${err} Failed in handleAddItemSubmit`);
      });
  };

  const handleDeleteItem = (item) => {
    api
      .deleteItem(item._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== selectedCard;
          })
        );
        closeActiveModal();
      })
      .catch((err) => {
        console.error(`${err} Failed in handleDeleteItem`);
      });
  };

  const handleLoginButtonClick = () => {
    closeActiveModal();
    handleLoginModal();
  };

  const handleSignUpButtonClick = () => {
    closeActiveModal();
    handleRigsterModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleExit = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleExit);
    return () => document.removeEventListener("keydown", handleExit);
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleOverly = (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeActiveModal();
      }
    };
    document.addEventListener("mousedown", handleOverly);
    return () => document.removeEventListener("mousedown", handleOverly);
  }, [activeModal]);

  useEffect(() => {
    api
      .getInitialItem()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log("token test: ", jwt);
    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
        navigate("/profile");
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const navigate = useNavigate();

  const handleRegistration = ({ email, password, username, avatar }) => {
    auth
      .register({ email, password, username, avatar })
      .then((res) => {
        setIsLoggedIn(true);
        setUserData({
          username: res.username,
          avatar: res.avatar,
          _id: res._id,
        });
        navigate("/profile");

        closeActiveModal();
      })
      .catch(console.error);
  };

  const checkloggedIn = () => {
    const jwt = localStorage.getItem("jwt");
    return auth
      .getUserInfo(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setUserData(res);
      })
      .catch((err) => {
        console.error("error in checkloggedIn", err);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({});
    closeActiveModal();
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        closeActiveModal();
        return checkloggedIn();
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            handleRigsterModal={handleRigsterModal}
            handleLoginModal={handleLoginModal}
            isLoggedIn={isLoggedIn}
            userData={userData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  defaultClothingItems={defaultClothingItems}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Profile
              userData={userData}
              handleCardClick={handleCardClick}
              handleAddClick={handleAddClick}
              clothingItems={clothingItems}
              setIsLoggedIn={setIsLoggedIn}
              signOut={signOut}
            />
          </ProtectedRoute>
          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
        )}

        {activeModal === "signUp" && (
          <RegisterModal
            isOpen={activeModal === "signUp"}
            handleRegistration={handleRegistration}
            handleLoginButtonClick={handleLoginButtonClick}
            onClose={closeActiveModal}
          />
        )}

        {activeModal === "login" && (
          <LoginModal
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            handleSignUpButtonClick={handleSignUpButtonClick}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

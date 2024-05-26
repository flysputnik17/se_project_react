import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";
import Header from "../Header/Header.jsx";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { coordinates, APIkey } from "../../utils/constants.jsx";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";
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
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
    token: "",
  });

  const [isLiked, setIsLiked] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const navigate = useNavigate();

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
    if (jwt) {
      checkloggedIn(jwt).catch((err) => {
        if (err.response && err.response.status === 401) {
          console.error("Token expired or invalid .Loggin out...");
          signOut();
        } else {
          console.error("Error fetching user data:", err);
        }
      });
    }
  }, []);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRigsterModal = () => {
    setActiveModal("signUp");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleConfirmationClick = () => {
    setActiveModal("confirmation");
  };

  const handleAddItemSubmit = (values) => {
    api
      .addNewItem(values)
      .then((res) => {
        setClothingItems((prevClothingItems) => [
          res.data,
          ...prevClothingItems,
        ]);
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

  const handleCardLike = (id, isLiked) => {
    if (!isLiked) {
      api
        .addCardLike(id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
          setIsLiked(true);
        })
        .catch((err) => console.log(err));
    } else {
      api
        .removeCardLike(id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
          setIsLiked(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLoginButtonClick = () => {
    closeActiveModal();
    handleLoginModal();
  };

  const handleSignUpButtonClick = () => {
    closeActiveModal();
    handleRigsterModal();
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const checkloggedIn = () => {
    const jwt = localStorage.getItem("jwt");

    return auth
      .getUserInfo(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        navigate("/profile");
      })
      .catch((err) => {
        console.error("error in checkloggedIn", err);
      });
  };
  const handleRegistration = (data) => {
    auth
      .register(data)
      .then(() => {
        handleLogin(data);
        setCurrentUser(data);

        closeActiveModal();
      })
      .catch(console.error);
  };
  const handleLogin = (data) => {
    setIsLoggedIn(true);
    auth
      .login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token); //setting the token to the localstorage when user login
        setCurrentUser(res);
        closeActiveModal();
        return checkloggedIn();
      })
      .catch((err) => {
        console.log("error in handleLogin", err);
      });
  };

  //signout function removing the token from the server then changing the isLogedIn to false so the user will be sent to the main page and removing the user data
  const signOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    closeActiveModal();
  };

  const handleEdit = (data) => {
    setIsLoggedIn(true);
    const jwt = localStorage.getItem("jwt");
    auth
      .edit(data, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((err) => {
        console.log("error in handleEdit", err);
      });
  };

  //handleLogin function is called form the Login modal and acceptes two parameters email and passord
  //after thet its calling the auth.login funciton and then setting the token to localStorage
  //after the checkloggedIn function will be called to get the token from the local storage
  //and retrive the user data to the frontend so it can be displayd

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            />

            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Main
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      signOut={signOut}
                      handleEditModal={handleEditModal}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              ></Route>

              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleConfirmationClick={handleConfirmationClick}
            />
          )}
          {activeModal === "confirmation" && (
            <ConfirmationModal
              onClose={closeActiveModal}
              activeModal={activeModal}
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
              onClose={closeActiveModal}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={activeModal === "edit"}
              handleEdit={handleEdit}
              onClose={closeActiveModal}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

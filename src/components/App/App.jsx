import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
import { setToken, getToken } from "../../utils/token.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

const auth = new Auth({ headers: { "Content-Type": "application/json" } });

function App() {
  /*the weatherData is an object that hase type,temp and city property
  i initialize its property in the begining with some values
  the setWeatherData is a callback function that will be called to change the initial 
  values of the weatherData property 
   
   */
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

  /*
  the handleAddClick function is passed to the Header component so when the button 
  in the Header component is clicked the function will be called 
  */
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

  /*
  this useEffect is calling the GetWeather function (an API one) we passing to it 
  the coordinates and APIkey as an argument in the .then we creating a new var 
  filterData to store the data we get from calling filterWeatherData function (an API functino)
  to this gunction we passing the API result we got from the GetWeather func called data
  and then the filterData that is holding the name of the city we passing it to the 
  setWeatherData the call back func of the weatherData hook and by that we geting the 
  name of the city 
  */
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  //useEffect to handle the Escape button cllick to close a modal
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

  //useEffect to handle the mouse click outside of the modal to be closed
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

  //useEffect for rendering the initial items
  useEffect(() => {
    api
      .getInitialItem()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setUserData({ username, email });
        navigate("/");
      })
      .catch(console.error);
  }, []);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //setting the user login status to be false by default for now
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    avatar: "",
    _id: "",
    token: "",
  });

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

  // handleLogin accepts one parameter: an object with two properties.
  const handleLogin = ({ email, password }) => {
    // If username or password empty, return without sending a request.
    if (!email || !password) {
      return;
    }

    // We pass the username and password as positional arguments. The
    // authorize function is set up to rename `username` to `identifier`
    // before sending a request to the server, because that is what the
    // API is expecting.
    auth
      .login({ email, password })
      .then((data) => {
        // Verify that a jwt is included before logging the user in.
        if (data) {
          setToken(data);
          auth.getUserInfo(data).then((user) => {
            setUserData(user); //save user's data to state
            setIsLoggedIn(true); //log the user in
            navigate("/profile");
          });
        }

        closeActiveModal();
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

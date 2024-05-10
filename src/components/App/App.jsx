import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Login from "../Login/Login.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
import Register from "../Register/Register.jsx";

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

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

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //setting the user login status to be false by default for now
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ username: "", email: "" });

  const navigate = useNavigate();

  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(username, password, email)
        .then(() => {
          console.log("successs");
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  // handleLogin accepts one parameter: an object with two properties.
  const handleLogin = ({ username, password }) => {
    // If username or password empty, return without sending a request.
    if (!username || !password) {
      return;
    }

    // We pass the username and password as positional arguments. The
    // authorize function is set up to rename `username` to `identifier`
    // before sending a request to the server, because that is what the
    // API is expecting.
    auth
      .authorize(username, password)
      .then((data) => {
        // Verify that a jwt is included before logging the user in.
        if (data.jwt) {
          setUserData(data.user); //save user's data to state
          setIsLoggedIn(true); //log the user in
          navigate("/profile"); //send them to /profile
        }
        console.log(data);
      })
      .catch(console.error);
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/login"
              element={
                <div className="loginContainer">
                  <Login handleLogin={handleLogin} />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="registerContainer">
                  <Register handleRegistration={handleRegistration} />
                </div>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                  />
                </ProtectedRoute>
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
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header weatherData={weatherData} handleAddClick={handleAddClick} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        {activeModal === "add-garment" && (
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            closeActiveModal={closeActiveModal}
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

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.JSX";
import "./Main.css";
import { useContext } from "react";
function Main({ handleCardClick, weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <>
      <WeatherCard weatherData={weatherData} />

      <section className="cardSection">
        <p className="cardSection__title">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} You may want to wear:
        </p>
        <ul className="cardSection__cardList">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </>
  );
}

export default Main;

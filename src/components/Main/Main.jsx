import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.JSX";
import "./Main.css";
import { useContext } from "react";
function Main({ handleCardClick, weatherData, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cardSection">
        <p className="cardSection__title">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} You may want to wear:
        </p>
        <ul className="cardSection__cardList">
          {filteredCards.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
function Main({ handleCardClick, weatherData }) {
  return (
    <>
      <WeatherCard day={true} condition="snow" weatherData={weatherData} />
      <ItemCard onCardClick={handleCardClick} weatherData={weatherData} />
    </>
  );
}

export default Main;

import WeatherCard from "../WeatherCard/WheaterCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
function Main({ handleCardClick }) {
  return (
    <>
      <WeatherCard day={true} type="sunny" />
      <ItemCard onCardClick={handleCardClick} />
    </>
  );
}

export default Main;

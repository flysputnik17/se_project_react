import WheaterCard from "../WeatherCard/WheaterCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
function Main({ handleCardClick }) {
  return (
    <>
      <WheaterCard day={true} type="sunny" />
      <ItemCard onCardClick={handleCardClick} />
    </>
  );
}

export default Main;

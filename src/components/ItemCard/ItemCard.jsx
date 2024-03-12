import "./ItemCard.css";
import { defaultClothingItems } from "../../utils/constants";

/*
the ItemCard func get the weatherData as a parameter that hold info from the 
API
to the cardElements we store the items that will be === to the type of the weather
we get and after that the card func will display only the items that has
the same weather type as the weather.type by that the only the items with
the same type of the current weather will be doplad
*/

function ItemCard({ onCardClick, weatherData }) {
  const cardElements = defaultClothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  const cards = () => {
    return cardElements.map((cardElement) => {
      return (
        <li className="cardSection__card" key={cardElement._id}>
          <h2 className="cardSection__card-title">{cardElement.name}</h2>
          <img
            className="cardSection__card-img"
            src={cardElement.link}
            alt={cardElement.name}
            onClick={() => {
              onCardClick(cardElement);
            }}
          ></img>
        </li>
      );
    });
  };

  return (
    <div className="cardSection">
      <h1 className="cardSection__title">
        Today is {weatherData.temp.F}°F / You may want to wear:
      </h1>
      <ul className="cardSection__cardList">{cards()}</ul>
    </div>
  );
}

export default ItemCard;

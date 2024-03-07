import "./ItemCard.css";
import { defaultClothingItems } from "../../utils/constants";

const ItemCard = () => {
  const cardElements = defaultClothingItems.map((item) => {
    const cardElement = {
      id: item._id,
      name: item.name,
      weather: item.weather,
      link: item.link,
    };
    return cardElement;
  });

  const cards = () => {
    return cardElements.map((cardElement) => {
      return (
        <li className="cardSection__card" key={cardElement.id}>
          <h2 className="cardSection__card-title">{cardElement.name}</h2>
          <img
            className="cardSection__card-img"
            src={cardElement.link}
            alt="cardImage"
          ></img>
        </li>
      );
    });
  };

  return (
    <div className="cardSection">
      <h1 className="cardSection__title">TEST</h1>
      <ul className="cardSection__cardList">{cards()}</ul>
    </div>
  );
};

export default ItemCard;

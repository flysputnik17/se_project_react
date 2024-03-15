import "./ItemCard.css";

/*
ItemCard get the onCardClick and item as parameters form the Main.jsx
and return a Li component 
*/

function ItemCard({ onCardClick, item }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="cardSection__card" key={item._id}>
      <h2 className="cardSection__card-title">{item.name}</h2>
      <img
        className="cardSection__card-img"
        src={item.link}
        alt={item.name}
        onClick={() => {
          onCardClick(handleCardClick);
        }}
      ></img>
    </li>
  );
}

export default ItemCard;

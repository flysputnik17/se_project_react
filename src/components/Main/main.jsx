import WheaterCard from "../WheaterCard/wheaterCard.jsx";
import ItemCard from "../ItemModal/ItemCard";
const Main = () => {
  return (
    <>
      <WheaterCard day={true} type="sunny" />
      <ItemCard />
    </>
  );
};

export default Main;

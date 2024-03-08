import WheaterCard from "../WheaterCard/WheaterCard.jsx";
import ItemCard from "../ItemModal/ItemCard.jsx";
const Main = () => {
  return (
    <>
      <WheaterCard day={true} type="sunny" />
      <ItemCard />
    </>
  );
};

export default Main;

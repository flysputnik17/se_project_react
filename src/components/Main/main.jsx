import WheaterCard from "../WheaterCard/wheaterCard";
import ItemCard from "../ItemModal/ItemCard";
const Main = () => {
  return (
    <>
      <WheaterCard day={true} type="storm" />
      <ItemCard />
    </>
  );
};

export default Main;

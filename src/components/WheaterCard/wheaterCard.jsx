import "./wheaterCard.css";
import { wheaterOptions } from "../../utils/constants.jsx";

/*
the WheaterCard is a var that will be called from the Main.js 
the WheaterCard recives object {day,type} and by that we will be able to find the correct wheater card to display on the screen
by using the filter method on the wheaterOptions array that contain array of objects from the constants.js
we filtering all the objects untill we find the one that hase the day and type property === to these we give the WheaterCard element from the Main.js
*/
const WheaterCard = ({ day, type }) => {
  const imageSrc = wheaterOptions.filter((i) => {
    if (i.day === day && i.type === type) {
      return i;
    }
  });

  const imgSrcUrl = imageSrc[0].url; //imageSrc stores an object white property like url,day and type and to get only the url from it we using the [] bracets to access the first property of this obj in that case its the url so later we can save it to imgSrcUrl var
  console.log(imgSrcUrl);
  return (
    <div className="wheaterCard">
      <h1 className="wheaterCard_temp">75°F</h1>
      <img className="wheaterCrad_Image" src={imgSrcUrl} alt="wheater card" />
    </div>
  );
};

export default WheaterCard;

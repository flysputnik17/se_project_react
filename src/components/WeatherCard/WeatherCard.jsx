import "./WheaterCard.css";
import { wheaterOptions } from "../../utils/constants.jsx";

/*
the WheaterCard is a var that will be called from the Main.js 
the WheaterCard recives object {day,type} and by that we will be able to find the correct wheater card to display on the screen
by using the filter method on the wheaterOptions array that contain array of objects from the constants.js
we filtering all the objects untill we find the one that hase the day and type property === to these we give the WheaterCard element from the Main.js
*/
function WeatherCard({ weatherData }) {
  const filterdOptions = wheaterOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption = filterdOptions[0];

  return (
    <div className="wheaterCard">
      <h1 className="wheaterCard_temp">{weatherData.temp.F}°F</h1>
      <img
        src={weatherOption?.url}
        className="wheaterCrad_Image"
        alt={weatherOption?.condition}
      />
    </div>
  );
}

export default WeatherCard;

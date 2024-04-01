import "./WheaterCard.css";
import { wheaterOptions, defaultWeatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.JSX";
import { useContext } from "react";

/*
the WheaterCard is a var that will be called from the Main.js 
the WheaterCard recives object {day,type} and by that we will be able to find the correct wheater card to display on the screen
by using the filter method on the wheaterOptions array that contain array of objects from the constants.js
we filtering all the objects untill we find the one that hase the day and type property === to these we give the WheaterCard element from the Main.js
*/
function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = wheaterOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="wheaterCard">
      <p className="wheaterCard_temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        className="wheaterCrad_Image"
        alt={weatherOption?.condition}
      />
    </section>
  );
}

export default WeatherCard;

import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.JSX";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <>
      <input
        checked={currentTemperatureUnit}
        onChange={handleToggleSwitchChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span
          className={
            currentTemperatureUnit === "F"
              ? "react-switch__slider react-switch-label-F"
              : "react-switch__slider react-switch-label-C"
          }
        />
        <p
          className={`switch__temp-F ${
            currentTemperatureUnit === "F" && "switch__active"
          }`}
        >
          F
        </p>
        <p
          className={`switch__temp-C ${
            currentTemperatureUnit === "C" && "switch__active"
          }`}
        >
          C
        </p>
      </label>
    </>
  );
};

export default ToggleSwitch;

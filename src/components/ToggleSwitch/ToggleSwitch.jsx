import "./ToggleSwitch.css";

function ToggleSwitch({ currentTemperatureUnit, setCurrentTemperatureUnit }) {
  return (
    <>
      <input
        checked={currentTemperatureUnit}
        onChange={setCurrentTemperatureUnit}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
        <span className="react-switch-label-F">F</span>
        <span className="react-switch-label-C">C</span>
      </label>
    </>
  );
}

export default ToggleSwitch;

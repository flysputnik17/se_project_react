import "./App.css";
import Header from "../Header/header";
import GetWeather from "../../utils/WeatherApi";
import Main from "../Main/main";

function App() {
  return (
    <div className="App">
      <Header currentLocation={GetWeather} />
      <Main />
    </div>
  );
}

export default App;

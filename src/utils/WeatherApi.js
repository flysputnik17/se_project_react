const APIkey = "eda9d536bdf5ecbb67925a027587af97";
const latitude = 32.0853;
const longitude = 34.781768;

export const GetWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      console.log(res);
      return res.json();
    } else {
      console.error(res.status);
      return Promise.reject(`Error:${res.status}`);
    }
  });
  return weatherApi;
};

export default GetWeather;

export const GetWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
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
};

/*
the filterWeatherData func get a data in our case a res.json format
then we creatin a new var to store the info we need from the API response and 
saveing it in the aproprity value for example if we want the name of the city 
we will access it from data.name and store it in the result.city var
by that we can access all the data we got form the API respone and store it in the result 
obj to the needed values
 */
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

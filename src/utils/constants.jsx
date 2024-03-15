export const wheaterOptions = [
  {
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
    day: true,
    condition: "clear",
  },
  {
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
    day: true,
    condition: "Clouds",
  },
  {
    url: new URL("../assets/day/fog.svg", import.meta.url).href,
    day: true,
    condition: "fog",
  },
  {
    url: new URL("../assets/day/rain.svg", import.meta.url).href,
    day: true,
    condition: "rain",
  },
  {
    url: new URL("../assets/day/storm.svg", import.meta.url).href,
    day: true,
    condition: "storm",
  },
  {
    url: new URL("../assets/day/snow.svg", import.meta.url).href,
    day: true,
    condition: "snow",
  },
  {
    url: new URL("../assets/night/cloudy.svg", import.meta.url).href,
    day: false,
    tyconditionpe: "cloudy",
  },
  {
    url: new URL("../assets/night/fog.svg", import.meta.url).href,
    day: false,
    condition: "fog",
  },
  {
    url: new URL("../assets/night/rain.svg", import.meta.url).href,
    day: false,
    condition: "rain",
  },
  {
    url: new URL("../assets/night/snow.svg", import.meta.url).href,
    day: false,
    condition: "snow",
  },
  {
    url: new URL("../assets/night/storm.svg", import.meta.url).href,
    day: false,
    condition: "storm",
  },
  {
    url: new URL("../assets/night/clear.svg", import.meta.url).href,
    day: false,
    condition: "clear",
  },
];

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    //condition for alt?
    url: new URL("../assets/day/default.svg", import.meta.url).href,
  },
  night: {
    day: false,
    url: new URL("../assets/night/default.svg", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 32.0853,
  longitude: 34.781768,
};

export const APIkey = "eda9d536bdf5ecbb67925a027587af97";

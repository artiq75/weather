import maplibregl, { StencilOp } from "maplibre-gl";
import "./style.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const LANG = "fr";
const UNITS = "metric";
const EXCLUDE = "current,minutely,hourly,alerts";
const STORAGE_WEATHER = "weather";

const map = new maplibregl.Map({
  container: "map",
  style: "https://demotiles.maplibre.org/style.json",
  center: [2, 47],
  zoom: 5,
});

const weatherItems = document.getElementById("weather-items");

const intlDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    return null
  }
}

async function getWeather(coordinate) {
  const queryString = `lat=${coordinate.lat}&lon=${coordinate.lng}&lang=${LANG}&units=${UNITS}&exclude=${EXCLUDE}&appid=${API_KEY}`;
  const URL = `${BASE_API_URL}?${queryString}`;
  const response = await fetch(URL);
  const weather = await response.json();
  return weather;
}

function render(weather) {
  const fragment = document.createDocumentFragment();
  weatherItems.innerHTML = ''
  for (const data of weather.daily) {
    const container = document.createElement("div");
    container.classList.add("weather-item");
    const datetime = container.appendChild(document.createElement("h2"));
    datetime.innerText = intlDateTimeFormat.format(data.dt * 1000);
    const temperature = container.appendChild(document.createElement("p"));
    temperature.innerText = `${data.temp.day} °c`;
    const description = container.appendChild(document.createElement("p"));
    description.innerText = data.weather[0].description;
    fragment.appendChild(container);
  }
  weatherItems.appendChild(fragment);
}

const weather = getStorage(STORAGE_WEATHER);

if (weather) {
  render(weather)
}

map.on("click", function (e) {
  getWeather(e.lngLat).then((weather) => {
    setStorage(STORAGE_WEATHER, weather)
    render(weather);
  });
});

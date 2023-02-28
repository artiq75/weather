import Storage, { WEATHER_KEY } from '../core/Service/Storage'
import DateTimeFormat from '../core/Service/DateTimeFormat'
import Map from './Map'
import OpenWeather from '../core/Service/OpenWeather'

const API_KEY = import.meta.env.VITE_API_KEY

export default class App {
  map = {}

  element = {}

  weatherItems = {}

  openWeather = {}

  constructor() {
    this.element = document.body.appendChild(document.createElement('div'))
    this.element.classList.add('app')
    this.weatherItems = this.element.appendChild(document.createElement('div'))
    this.weatherItems.classList.add('weather-items')

    this.map = new Map(this)

    this.openWeather = new OpenWeather({
      appid: API_KEY,
      lat: 0,
      lng: 0
    })
  }

  start() {
    const weather = Storage.get(WEATHER_KEY)

    if (weather) {
      this.render(weather)
    }

    this.map.map.on('click', this.onClick.bind(this))
  }

  onClick(e) {
    this.openWeather
      .getDaily({
        lat: e.lngLat.lat,
        lon: e.lngLat.lng
      })
      .then((weather) => {
        Storage.set(WEATHER_KEY, weather)
        this.render(weather)
      })
  }

  render(weather) {
    if (this.marker) {
      this.marker.remove()
    }

    this.marker = this.map.newMarker({
      lat: weather.lat,
      lng: weather.lon
    })

    const fragment = document.createDocumentFragment()

    this.weatherItems.innerHTML = ''

    for (const data of weather.daily) {
      const item = this.createWeatherItem(data)
      fragment.appendChild(item)
    }

    this.weatherItems.appendChild(fragment)
  }

  createWeatherItem(data) {
    const container = document.createElement('div')
    container.classList.add('weather-item')
    const datetime = container.appendChild(document.createElement('h2'))
    datetime.innerText = DateTimeFormat.format(data.dt * 1000)
    const temperature = container.appendChild(document.createElement('p'))
    temperature.innerText = `${data.temp.day} °c`
    const description = container.appendChild(document.createElement('p'))
    description.innerText = data.weather[0].description
    return container
  }
}

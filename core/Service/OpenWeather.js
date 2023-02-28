import Http from './Http'

export default class OpenWeather {
  baseURL = import.meta.env.VITE_BASE_API_URL

  query = {}

  constructor(options = {}) {
    this.options = {
      units: 'metric',
      lang: 'fr',
      ...options
    }
  }

  async getDaily(options = {}) {
    const query = new URLSearchParams()
    for (const option in Object.assign(this.options, options)) {
      query.append(option, this.options[option])
    }
    const weather = await Http.get(this.baseURL + '?' + query.toString())
    return weather
  }
}

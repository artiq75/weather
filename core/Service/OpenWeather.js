export default class OpenWeather {
  baseURL = import.meta.env.VITE_BASE_API_URL

  query = {}

  constructor(options = {}) {
    this.options = {
      metric: 'metric',
      lang: 'fr',
      ...options
    }

    this.query = new URLSearchParams()

    for (const option in this.options) {
      this.query.append(option, this.options[option])
    }
  }

  async getDaily(options) {
    for (const option in options) {
      this.query.delete(option)
      this.query.append(option, this.options[option])
    }
    console.log(this.query.toString())
    return
    const weather = await Http.get(URL)
    return weather
  }
}

export default class Http {
  static async get(url) {
    const response = await fetch(url);
    const weather = await response.json();
    return weather;
  }
}

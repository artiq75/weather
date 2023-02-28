import maplibregl from 'maplibre-gl'

export default class Map {
  map = null

  element = null

  marker = null

  constructor(app) {
    this.element = app.element.appendChild(document.createElement('div'))
    this.element.setAttribute('id', 'map')
    this.element.classList.add('map')

    this.map = new maplibregl.Map({
      container: this.element,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [2, 46],
      zoom: 5
    })
  }

  newMarker(data) {
    return new maplibregl.Marker()
      .setLngLat({
        lat: data.lat,
        lng: data.lng
      })
      .addTo(this.map)
  }
}

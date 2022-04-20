const axios = require('axios')

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José']

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: 'es',
      limit: 5,
    }
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    }
  }

  async ciudad(lugar = '') {
    try {
      //   peticion http
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      })

      const resp = await instance.get()
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }))
    } catch (error) {
      return []
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: { ...this.paramsOpenWeather, lat, lon },
      })

      const { data } = await instance.get()
      const { weather, main } = data

      return {
        temperatura: main.temp,
        minima: main.temp_min,
        maxima: main.temp_max,
        estado: weather[0].description,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Busquedas

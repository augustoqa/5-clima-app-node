const fs = require('fs')
const axios = require('axios')

class Busquedas {
  historial = []
  dbPath = './db/database.json'

  constructor() {
    this.leerDB()
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      return lugar
        .split(' ')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(' ')
    })
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

  agregarHistorial(lugar = '') {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return
    }
    this.historial = this.historial.splice(0, 5)

    this.historial.unshift(lugar.toLocaleLowerCase())

    // Grabar en DB
    this.guardarDB()
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })

    const data = JSON.parse(info)

    this.historial = data.historial
  }
}

module.exports = Busquedas

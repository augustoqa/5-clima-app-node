const axios = require('axios')

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José']

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = '') {
    try {
      //   peticion http
      const resp = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?language=es&access_token=pk.eyJ1IjoiZHVja2UiLCJhIjoiY2wxcmNnNHBnMWlkMjNkcGNodGhicXl3cyJ9.szNfqXUnqK0K-RAZV5JmQA'
      )
      console.log(resp.data)

      return [] // retornar los lugares
    } catch (error) {
      return []
    }
  }
}

module.exports = Busquedas

const axios = require('axios')

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San José']

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = '') {
    try {
      //   peticion http
      const resp = await axios.get('https://reqres.in/api/users?page=2')
      console.log(resp.data)

      return [] // retornar los lugares
    } catch (error) {
      return []
    }
  }
}

module.exports = Busquedas

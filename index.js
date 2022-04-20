require('dotenv').config()
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require('./helpers/inquirer')
const Busquedas = require('./models/busquedas')

const main = async () => {
  const busquedas = new Busquedas()
  let opt = ''

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput('Ciudad:')

        // Buscar lugares
        const lugares = await busquedas.ciudad(termino)

        // Seleccionar el lugar
        const id = await listarLugares(lugares)
        const lugarSeleccionado = lugares.find((l) => l.id === id)

        // Clima
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        )

        // Mostrar resultados
        console.log('\nInformación de la ciudad\n'.green)
        console.log('Ciudad:', lugarSeleccionado.nombre.green)
        console.log('Lat:', lugarSeleccionado.lat)
        console.log('Lng:', lugarSeleccionado.lng)
        console.log('Temperatura:', clima.temperatura)
        console.log('Mínima:', clima.minima)
        console.log('Máxima:', clima.maxima)
        console.log('Cómo está el clima:', clima.estado.green)
        break

      case 2:
        console.log('Historial')
        break
    }

    if (opt !== 0) await pausa()
  } while (opt !== 0)
}

main()

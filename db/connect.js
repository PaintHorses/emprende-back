const mongoose = require('mongoose')

const dbConnect = () => { 
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => { 
        console.log("Conexión a la base de datos: OK")
    })
    .catch((err) => console.log(`Error al conectar a la Base de Datos: ${err}`))
}

module.exports = dbConnect
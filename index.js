require('dotenv').config()

const express = require('express')
const transporter = require('./helpers/mailer')
const cookieParser = require('cookie-parser')
const dbConnect = require('./db/connect')
const Task = require('./models/task')
const User = require('./models/user')
const taskRouter = require('./routes/task')
const authRouter = require('./routes/auth')
const { jwtValidation } = require('./middlewares/jwtValidation')


const app = express()

const port = process.env.PORT

// Conexión a la BBDD
dbConnect()

// middlewares
app.use(express.static('public',{extensions: ['html', 'js', 'css']}))   // Utilizar archivos estáticos - FRONT END
app.use(express.json())             // Solo acepta peticiones Json
app.use(cookieParser()) // Gestionar las cookies en el req

// Rutas login
app.use('/api/auth', authRouter)

// Middleware para verifijar token
app.use(jwtValidation)

// Rutas tareas
app.use('/api/tasks', taskRouter)

app.listen(port, () => {
  console.log(`App listening at port: ${port}`)
})
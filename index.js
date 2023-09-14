require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const app = express()

const port = process.env.port

const taskSchema = new Schema({
        name: String,
        done: Boolean,
        //createBy
})

const Task = mongoose.model('Task', taskSchema, 'Tasks')

mongoose.connect(process.env.MONGODB_URL).then(() => { 
    console.log("Conexión a la base de datos: OK")
}).catch((err) => console.log("Error al conectar a la Base de Datos."))

// midlewares
app.use(express.static('public'))   // Utilizar archivos estáticos - FRONT END
app.use(express.json())             // Solo acepta peticiones Json

app.get('/api/tasks', (req, res) => {

    Task.find().then((tasks) => {
        res.status(200).json({ok: true, data: tasks})
    }).catch((err) => {
        res.status(400).json({ok: false, message:"Hubo un problema al obtener las tareas"})
    })
})

app.post('/api/task', function(req, res) {
    const body = req.body

    Task.create({
        name: body.text,
        done: false,
        hello: "hola"
    }).then ((createdTask) => {
        res.status(201).json({ok:true, message:"Tarea creada correctamente", data: createdTask})
    }).catch((err) => {
        res.status(400).json({ok:false, message:"Error al crear la tarea" + err})
    })
})
app.put('/api/task/:id', function(req, res) {
    const body = req.body
    const task_id = req.params.id

    Task.findByIdAndUpdate(task_id, {
        name: body.text,
    }).then ((updateTask) => {
        res.status(200).json({ok:true, message:"Tarea actualizada correctamente", data: updateTask})
    }).catch((err) => {
        res.status(400).json({ok:false, message:"Error al actualizar la tarea" + err})
    })
})



app.delete('/api/task/:id', function(req, res) {
    const id = req.params.id
    Task.findByIdAndRemove(id).then((deleteTask) => {
        res.status(200).json({ok: true, message:"Tarea eliminada"})
    }).catch((err) => {
        res.status(400).json({ok: false, message: "Error al eliminar la tarea"})
    })
    
})

app.listen(port, () => {
  console.log(`App listening on port`)
})
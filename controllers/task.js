const { Task } = require('../models/task')


const getAll = function (req, res)  {

    Task.find().then((tasks) => {
        res.status(200).json({ok: true, data: tasks})
    }).catch((err) => {
        res.status(400).json({ok: false, message:"Hubo un problema al obtener las tareas"})
    })
}

const create = function(req, res) {
    const body = req.body

    Task.create({
        name: body.text,
        done: false,
    }).then ((createdTask) => {
        res.status(201).json({ok:true, message:"Tarea creada correctamente", data: createdTask})
    }).catch((err) => {
        res.status(400).json({ok:false, message:"Error al crear la tarea" + err})
    })
}

const update =  function(req, res) {
    const body = req.body
    const task_id = req.params.id

    Task.findByIdAndUpdate(task_id, {
        name: body.text,
    }).then ((updateTask) => {
        res.status(200).json({ok:true, message:"Tarea actualizada correctamente", data: updateTask})
    }).catch((err) => {
        res.status(400).json({ok:false, message:"Error al actualizar la tarea" + err})
    })
}

const remove = function(req, res) {
    const id = req.params.id
    Task.findByIdAndRemove(id).then((deleteTask) => {
        res.status(200).json({ok: true, message:"Tarea eliminada correctamente"})
    }).catch((err) => {
        res.status(400).json({ok: false, message: "Error al eliminar la tarea"})
    })
    
}

module.exports = {
    getAll,
    create,
    update,
    remove
}
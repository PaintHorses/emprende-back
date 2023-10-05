const createEditBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const tasksDIV = document.querySelector("#tasks")
const baseBackendUrl =  `${window.origin}/api`
let TASK_TO_EDIT = null

createEditBtn.addEventListener("click", function() {
    const creating = !TASK_TO_EDIT
    const path = creating ? 'tasks' : `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? 'POST' : 'PUT'

    fetch(`${baseBackendUrl}/${path}`, {
        method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text: input.value })
    }).then((res) => res.json()).then((resJSON) => {
        getTasks()
        createEditBtn.innerText = 'Crear Tarea'
        input.value = ""
        TASK_TO_EDIT = null    
    })
})

function getTasks() {
    tasksDIV.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
        .then((res) => res.json()).then((resJson) => {
            const tasks = resJson.data
            let columns = 2
            const table = document.createElement("table")
            table.className = "table table-striped table-hover"
            
            // Tabla - Cabecera
            const thead = document.createElement("thead")
            const rowHeader = document.createElement("tr")

            const column1Header = document.createElement("th")
            column1Header.setAttribute("width", "20%")
            const column1TextHeader = document.createTextNode("#")
            column1Header.appendChild(column1TextHeader)

            const column2Header = document.createElement("th")
            column2Header.setAttribute("width", "70%")
            const column2TextHeader = document.createTextNode("Tarea")
            column2Header.appendChild(column2TextHeader)

            const column3Header = document.createElement("th")
            const column3TextHeader = document.createTextNode("")
            column3Header.appendChild(column3TextHeader)

            const column4Header = document.createElement("th")
            const column4TextHeader = document.createTextNode("")
            column4Header.appendChild(column4TextHeader)

            rowHeader.appendChild(column1Header)
            rowHeader.appendChild(column2Header)
            rowHeader.appendChild(column3Header)
            rowHeader.appendChild(column4Header)

            thead.appendChild(rowHeader)
            table.appendChild(rowHeader)


            const tbody = document.createElement("tbody")
                        
            let num = 1

            for (let task of tasks) {
                let fila = document.createElement("tr")
                
                const column1 = document.createElement("td")
                const textColumn1 = document.createTextNode(num)
                column1.appendChild(textColumn1)
                fila.appendChild(column1)
                
                const column2 = document.createElement("td")
                const textColumn2 = document.createTextNode(task.name)
                column2.appendChild(textColumn2)
                fila.appendChild(column2)

                const column3 = document.createElement("td")
                const updateTaskBtn = document.createElement("button")
                updateTaskBtn.className = "btn btn-primary"                
                updateTaskBtn.innerText = "Modificar"
                updateTaskBtn.setAttribute("id", task._id)
                updateTaskBtn.addEventListener('click', (e) => {
                    input.value =  task.name
                    createEditBtn.innerText = 'Editar Tarea'
                    TASK_TO_EDIT = task
                    getTasks()
                })
                column3.appendChild(updateTaskBtn)
                fila.appendChild(column3)
                
                const column4 = document.createElement("td")
                const deleteTaskBtn = document.createElement("button")
                deleteTaskBtn.className = "btn btn-danger"                
                deleteTaskBtn.innerText = "Eliminar"
                deleteTaskBtn.setAttribute("id", task._id)
                deleteTaskBtn.addEventListener('click', (e) => {
                    deleteTaskBtn.innerText = '...'
                    const taskId = e.target.id
                    deleteTask(taskId)
                    getTasks()
                })

                column4.appendChild(deleteTaskBtn)
                
                fila.appendChild(column4)
                tbody.appendChild(fila)

                num++
            }
            table.appendChild(tbody)
            tasksDIV.appendChild(table)
            

        }) 
            
}

async function deleteTask(taskId) {
    try {
        const res = await fetch(`${baseBackendUrl}/tasks/${taskId}`, {
            method: 'DELETE',   
        })

        const resJSON = await res.json()
        
        Swal.fire({
            text: resJSON.message,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
        
    } catch(error) {
        Swal.fire({
            title: 'App Tareas',
            text: resJSON.message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        })
    }
}

getTasks()
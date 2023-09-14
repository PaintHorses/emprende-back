

createEditBtn.addEventListener("click", function() {
    const creating = !TASK_TO_EDIT
    const path = creating ? 'task' : `task/${TASK_TO_EDIT._id}`
    const method = creating ? 'POST' : 'PUT'

    fetch(`${baseBackendUrl}/${path}`, {
        method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ text: input.value })
    }).then((res) => res.json()).then((resJSON) => {
        getTasks()
        createEditBtn.innerText = 'Crear Tarea'
        input.value = ""
    })
})

function getTasks() {
    tasksDIV.innerHTML = null
    fetch(`${baseBackendUrl}/tasks`)
        .then((res) => res.json()).then((resJson) => {
            const tasks = resJson.data
            for (let task of tasks) {
                const taskParagraph = document.createElement("p")
                const deleteTaskBtn = document.createElement("button")
                const taskContainerDiv = document.createElement("div")
                
                taskParagraph.innerText = task.name
                taskParagraph.setAttribute("id", task._id)
                taskParagraph.addEventListener("click", (e) => {
                    input.value =  task.name
                    createEditBtn.innerText = 'Editar Tarea'
                    TASK_TO_EDIT = task
                })

                deleteTaskBtn.innerText = "Borrar"
                deleteTaskBtn.setAttribute("id", task._id)
                deleteTaskBtn.addEventListener('click', (e) => {
                    deleteTaskBtn.innerText = '...'
                    const taskId = e.target.id
                    fetch(`${baseBackendUrl}/task/${taskId}`, {
                        method: 'DELETE',   
                    }).then(() => {
                        const taskDIV = deleteTaskBtn.parentElement
                        taskDIV.remove()
                    })
                })

                taskContainerDiv.appendChild(taskParagraph)
                taskContainerDiv.appendChild(deleteTaskBtn)
                
                tasksDIV.appendChild(taskContainerDiv)
            }
        }) 
            
}
const createEditBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const tasksDIV = document.querySelector("#tasks")
const baseBackendUrl =  `${window.origin}/api`
let TASK_TO_EDIT = null

getTasks()
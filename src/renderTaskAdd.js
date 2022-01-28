export {renderTaskAdd}
export {renderTasks}
import { taskAddClickEvent } from "./taskAddClickEvent"

function renderTaskAdd() {

    let container1 = document.getElementById('container1')


    let taskAddContainer = document.createElement('div')
    taskAddContainer.id = "taskAddContainer"

    let taskNameInput = document.createElement('input')
    taskNameInput.id = "taskNameInput"
    taskNameInput.classList.add('taskInput')
    taskNameInput.type = "text"

    let taskDescriptionInput = document.createElement('input')
    taskDescriptionInput.id = "taskDescriptionInput"
    taskDescriptionInput.classList.add('taskInput')
    taskDescriptionInput.type = "text"

    let taskPrioritySelect = document.createElement('select')
    taskPrioritySelect.id = "taskPrioritySelect"
    let priorities = [5,4,3,2,1]
    priorities.forEach(item => {
        let option = document.createElement('option')
        option.innerHTML = item
        option.classList.add('taskPriorityItem')
        taskPrioritySelect.appendChild(option)
    })

    let taskAddBtn = document.createElement('button')
    taskAddBtn.classList.add('taskAddBtn')
    taskAddBtn.textContent = "Create Task"
    taskAddBtn.addEventListener('click', taskAddClickEvent)

    taskAddContainer.appendChild(taskNameInput)
    taskAddContainer.appendChild(taskDescriptionInput)
    taskAddContainer.appendChild(taskPrioritySelect)
    taskAddContainer.appendChild(taskAddBtn)
    container1.appendChild(taskAddContainer)
}

function renderTasks(proj){
    let taskContainer = document.getElementById('taskContainer')

    while(taskContainer.firstChild){
        taskContainer.firstChild.remove()
    }

    proj.tasks.forEach(task => {
        let taskCard = document.createElement('div')
        taskCard.id = 'taskCard'
    
        let taskName = document.createElement('div')
        taskName.id = 'taskName'
        taskName.textContent = task.name

        let taskDescription = document.createElement('div')
        taskDescription.id = 'taskDescription'
        taskDescription.textContent = task.description

        let taskPriority = document.createElement('taskPriority')
        taskPriority.id = 'taskPriority'
        taskPriority.textContent = task.priority


        taskCard.appendChild(taskName)
        taskCard.appendChild(taskDescription)
        taskCard.appendChild(taskPriority)
        taskContainer.appendChild(taskCard)

    })
}
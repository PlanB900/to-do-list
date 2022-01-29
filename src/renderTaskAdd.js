export { renderTaskAdd }
export { renderTasks} 
import { newTask } from "./newTask"
import { addDays } from 'date-fns'

//Creates dom elements that comprise task add section,
//adds listener to 'Create Task' button
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

    let taskDateInput = document.createElement('input')
    taskDateInput.id = 'taskDateInput'
    taskDateInput.classList.add("taskInput")
    taskDateInput.type = 'date'

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
    //Listener
    taskAddBtn.addEventListener('click', newTask)

    taskAddContainer.appendChild(taskNameInput)
    taskAddContainer.appendChild(taskDescriptionInput)
    taskAddContainer.appendChild(taskDateInput)
    taskAddContainer.appendChild(taskPrioritySelect)
    taskAddContainer.appendChild(taskAddBtn)
    container1.appendChild(taskAddContainer)
}

//Takes a given project, resets container that displays tasks,
//creates DOM elements for each task and puts them in conainer
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

        let taskDate = document.createElement('div')
        taskDate.id = 'taskDate'
        taskDate.textContent = task.dueDate

        let taskPriority = document.createElement('taskPriority')
        taskPriority.id = 'taskPriority'
        taskPriority.innerHTML = '&#9679'
        taskPriority.classList.add(assignPriorityColor(task))


        taskCard.appendChild(taskName)
        taskCard.appendChild(taskDescription)
        taskCard.appendChild(taskDate)
        taskCard.appendChild(taskPriority)
        taskContainer.appendChild(taskCard)

    })
}

function assignPriorityColor(task){
    if(task.priority == 5){
        return 'priority5'
    }
    if(task.priority == 4){
        return 'priority4'
    }
    if(task.priority == 3){
        return 'priority3'
    }
    if(task.priority == 2){
        return 'priority2'
    }
    if(task.priority == 1){
        return 'priority1'
    }
}
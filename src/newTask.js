import { createTasks } from "./createTasks"
import { renderTasks } from "./renderTaskAdd"
import { projects, createProject } from "./createProject"
import { renderProjects } from "./renderHome"
export {newTask}


//Searches DOM for needed elements, validates input fields, then creates new task,
//adds it to currentProj, calls render.
function newTask() {
    let inputs = Array.from(document.getElementsByClassName('taskInput'))
    let taskNameInput = document.getElementById('taskNameInput')
    let taskDateInput = document.getElementById('taskDateInput')
    let taskDescriptionInput = document.getElementById('taskDescriptionInput')
    let taskPrioritySelect = document.getElementById('taskPrioritySelect')

    if(validateInputs(inputs)){
        let task = createTasks(taskNameInput.value,taskDescriptionInput.value,taskPrioritySelect.value,taskDateInput.value)
        if(!projects.currentProj){
            projects.currentProj = createProject('Unnamed Project')
            projects.projectList.push(projects.currentProj)
            renderProjects(projects.projectList)
        }
        projects.currentProj.addTask(task)
        projects.currentProj.sortTasks()
        renderTasks(projects.currentProj)
    }
}

function validateInputs(inputs){
    let counter = 0
    inputs.forEach(input => {
        input.classList.remove('emptyInput')
        if (input.value == ""){
            input.classList.add('emptyInput')
        } else {
            counter++
        }
    })
    if(counter == 3){
        return true
    }
}
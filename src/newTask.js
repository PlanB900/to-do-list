import { createTasks } from "./createTasks"
import { renderTasks } from "./renderTaskAdd"
import { currentProj } from "./renderHome"
export {newTask}


//Searches DOM for needed elements, validates input fields, then creates new task,
//adds it to currentProj, calls render.
function newTask() {
    let inputs = Array.from(document.getElementsByClassName('taskInput'))
    let taskNameInput = document.getElementById('taskNameInput')
    let taskDescriptionInput = document.getElementById('taskDescriptionInput')
    let taskPrioritySelect = document.getElementById('taskPrioritySelect')

    if(validateInputs(inputs)){
        let task = createTasks(taskNameInput.value,taskDescriptionInput.value,taskPrioritySelect.value)
        currentProj.addTask(task)
       currentProj.sortTasks()
       renderTasks(currentProj)
       //add task to currentProj
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
    if(counter == 2){
        return true
    }
}
import { createTasks } from "./createTasks"
import { renderTasks } from "./renderTaskAdd"
import { currentProj } from "./renderHome"

export {taskAddClickEvent}
function taskAddClickEvent() {
    let inputs = Array.from(document.getElementsByClassName('taskInput'))
    let taskNameInput = document.getElementById('taskNameInput')
    let taskDescriptionInput = document.getElementById('taskDescriptionInput')
    let taskPrioritySelect = document.getElementById('taskPrioritySelect')

    let counter = 0

    inputs.forEach(input => {
        input.classList.remove('emptyInput')
        if (input.value == ""){
            input.classList.add('emptyInput')
        } else {
            counter++
            console.log(counter)
        }
    })

    if (counter == 2) {
        let task = createTasks(taskNameInput.value,taskDescriptionInput.value,taskPrioritySelect.value)
        currentProj.addTask(task)
        currentProj.sortTasks()
        renderTasks(currentProj)
        //add task to currentProj
    }
}

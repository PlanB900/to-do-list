export {renderHome, renderProjectAdd, renderTaskAdd}
import {projects, createProject} from './createProject'
import { addDays } from 'date-fns'
import { createTasks } from "./createTasks"



//Creates and displays dom elements for header area
function renderHome(){
    let content = document.getElementById('content')
    while(content.firstChild){
        content.firstChild.remove()
    }

    let title = document.createElement('div')
    title.id = 'title'
    title.textContent = "To-Do List."

    let block1 = document.createElement('div')
    block1.id = "block1"

    content.appendChild(block1)
    block1.appendChild(title)
}

//Renders section where user creates new projects,
//Attaches listener to add project button
function renderProjectAdd() {
    let content = document.getElementById('content')

    let container1 = document.createElement('div')
    container1.id = 'container1'

    let projAddContainer = document.createElement('div')
    projAddContainer.id = "projAddContainer"

    let projAddNameInput = document.createElement('input')
    projAddNameInput.type = 'text'
    projAddNameInput.id = 'projAddNameInput'
    
    let projAddBtn = document.createElement('button')
    projAddBtn.textContent = 'Add Project'
    projAddBtn.id = 'projAddBtn'

    let taskContainer = document.createElement('div')
    taskContainer.id = 'taskContainer'

    let projViewContainer = document.createElement('div')
    projViewContainer.id  = "projViewContainer"

    projAddContainer.appendChild(projAddNameInput)
    projAddContainer.appendChild(projAddBtn)
    projAddContainer.appendChild(projViewContainer)
    container1.appendChild(projAddContainer)
    container1.appendChild(taskContainer)
    content.appendChild(container1)

    //Listener
    projAddBtn.addEventListener('click', addProject)
}

//Re-searches DOM for input value, creates project and makes it currentProj,
//calls renderTasks, calls renderProjects 

function addProject(){
    if (projAddNameInput.value!= ""){
        projects.resetCurrentProj()
        projects.projectList.push(createProject(projAddNameInput.value))
        projects.setCurrentProj()
        renderTasks(projects.currentProj)
        renderProjects(projects.projectList)

        localStorage.setItem('projects', JSON.stringify(projects))
    }
}

//Takes array of projects, clears project display container, 
//generates DOM elements necessary,
//attaches listener to view project button on each project
//Biggest issue in the whole project is this function
function renderProjects(projectList) {
    
    while(projViewContainer.firstChild){
        projViewContainer.firstChild.remove()
    }

    projectList.forEach(proj => {

        let projCard = document.createElement('div')
        projCard.classList.add('projCard')
        if(proj.isCurrentProj){projCard.classList.add('currentProj')}

        let projCardName = document.createElement('div')
        projCardName.classList.add('projCardName')
        projCardName.textContent = `${proj.name}`

        let projCardBtn = document.createElement('button')
        projCardBtn.textContent = 'View Project'

        projCard.appendChild(projCardName)
        projCard.appendChild(projCardBtn)
        projViewContainer.appendChild(projCard)

        //Listener sets targeted project to currentProj,
        projCardBtn.addEventListener('click', (e) => {
            projects.resetCurrentProj()
            assignCurrentProjClass(e)
            proj.isCurrentProj = true;
            projects.setCurrentProj()
            renderTasks(projects.currentProj)

        })
    })

}



function removeProject(){
    let index = projects.projectList.findIndex(project => project == projects.currentProj)
    projects.deleteProject(index)
    projects.resetCurrentProj()
    projects.currentProj = undefined
    renderProjects(projects.projectList)
    renderTasks(projects.currentProj)
}

function assignCurrentProjClass(e){
    let projCards = Array.from(document.getElementsByClassName('projCard'))
    projCards.forEach(projCard => {
        projCard.classList.remove('currentProj')
    })
    e.target.parentNode.classList.add('currentProj')
}

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
//creates DOM elements for each task and puts them in container
function renderTasks(proj){

    let taskContainer = document.getElementById('taskContainer')

    while(taskContainer.firstChild){
        taskContainer.firstChild.remove()
    }
    
    if(proj.tasks.length === 0){
        let deleteProjBtn = document.createElement('button')
        deleteProjBtn.id = "deleteProjBtn"
        deleteProjBtn.textContent = "Delete Project"
        taskContainer.appendChild(deleteProjBtn)
        //DeleteProjBtn listener
        deleteProjBtn.addEventListener('click', removeProject)
    }

    proj.tasks.forEach(task => {
        let taskCard = document.createElement('div')
        taskCard.id = 'taskCard'
        taskCard.classList.add('taskCard')
    
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

        let taskDeleteBtn = document.createElement('button')
        taskDeleteBtn.id = 'taskDeleteBtn'
        taskDeleteBtn.innerHTML = '&#10006'
        //Listener
        taskDeleteBtn.addEventListener("click",removeTask)


        taskCard.appendChild(taskName)
        taskCard.appendChild(taskDescription)
        taskCard.appendChild(taskDate)
        taskCard.appendChild(taskPriority)
        taskCard.appendChild(taskDeleteBtn)
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



//Searches DOM for needed elements, validates input fields, then creates new task,
//adds it to currentProj, calls render. Creates a current proj if there isn't one.
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

function removeTask(e){
    let domTasks = Array.from(document.getElementsByClassName('taskCard'))
    let index = domTasks.indexOf(e.target.parentNode)
    projects.currentProj.deleteTask(index)
    renderTasks(projects.currentProj)
}
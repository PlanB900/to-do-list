export {renderProjectAdd}
export {renderHome}
export {currentProj}
import { renderTasks } from "./renderTaskAdd"
import {projects, createProject} from './createProject'

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
let currentProj

function addProject(){
    let projAddNameInput = document.getElementById('projAddNameInput').value

    if (projAddNameInput!= ""){
        resetCurrentProj(projects.projectList)
        currentProj = createProject(projAddNameInput)
        projects.projectList.push(currentProj)
        renderTasks(currentProj)
        renderProjects(projects.projectList)
    }
}


function renderProjects(array) {
    
    while(projViewContainer.firstChild){
        projViewContainer.firstChild.remove()
    }

    array.forEach(proj => {

        let projCard = document.createElement('div')
        projCard.classList.add('projCard')

        let projCardName = document.createElement('div')
        projCardName.classList.add('projCardName')
        projCardName.textContent = `${proj.name}`

        let projCardBtn = document.createElement('button')
        projCardBtn.textContent = 'View Project'

        projCard.appendChild(projCardName)
        projCard.appendChild(projCardBtn)

        projViewContainer.appendChild(projCard)

        //Listener
        projCardBtn.addEventListener('click',()=>{
            resetCurrentProj(projects.projectList)
            proj.currentProj = true;
            currentProj = projects.projectList.find(proj => proj.currentProj === true)
            renderTasks(currentProj)
            
        })
    })

}

//Take array of projects, set them all to false each time 'view project' is clicked so
//that there is only ever one currentProj
function resetCurrentProj(array) {
    array.forEach(proj => {
        proj.currentProj = false
    })
}



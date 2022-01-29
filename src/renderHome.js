export {renderProjectAdd}
export {renderHome}
import { renderTasks } from "./renderTaskAdd"
import {projects, createProject} from './createProject'

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
    let projAddNameInput = document.getElementById('projAddNameInput').value

    if (projAddNameInput!= ""){
        projects.resetCurrentProj()
        projects.currentProj = createProject(projAddNameInput)
        projects.projectList.push(projects.currentProj)
        renderTasks(projects.currentProj)
        renderProjects(projects.projectList)
    }
}

//Takes array of projects, clears project display container, 
//generates DOM elements necessary,
//attaches listener to view project button on each project
//Biggest issue in the whole project is this function
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

        //Listener sets targeted project to currentProj,
        projCardBtn.addEventListener('click',()=>{
            projects.resetCurrentProj()
            proj.isCurrentProj = true;
            projects.setCurrentProj()
            renderTasks(projects.currentProj)
        })
    })

}





import "./assets/styles.css"
import { createProject, projects } from "./createProject"
import { renderHome, renderProjectAdd, renderTaskAdd, renderProjects, renderTasks} from "./ui"

renderHome()
renderProjectAdd()
renderTaskAdd()
renderProjects(projects.projectList)
renderTasks(projects.currentProj)




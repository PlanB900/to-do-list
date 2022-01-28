export {createProject,projects}

function createProject(name) {

    let tasks = []

    function addTask(obj) {
        this.tasks.push(obj)
    }

    function sortTasks(){
        this.tasks.sort((a,b) => {
            console.log('x')
            return a.priority - b.priority;
        })
    }

    return{
        currentProj:false,
        name: name,
        tasks,
        sortTasks,
        addTask
    }
}

let projects = (()=>{


    let projectList = []
    let currentProject

    return {
        projectList,
        currentProject
    }
})()

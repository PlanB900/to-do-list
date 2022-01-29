export {createProject, projects}

function createProject(name) {

    let tasks = []
    let isCurrentProj = false;

    function addTask(obj) {
        this.tasks.push(obj)
    }

    function sortTasks(){
        this.tasks.sort((a,b) => {
            return a.priority - b.priority;
        })
    }

    return{
        name: name,
        isCurrentProj,
        tasks,
        sortTasks,
        addTask
    }
}

let projects = {

    projectList: [],
    currentProj: undefined,
    setCurrentProj: function(){
        this.currentProj = this.projectList.find(proj => proj.isCurrentProj === true)
    }
}

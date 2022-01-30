export {createProject, projects}

function createProject(name) {

    let tasks = []
    let isCurrentProj = true;

    function addTask(obj) {
        this.tasks.push(obj)
    }

    function sortTasks(){
        this.tasks.sort((a,b) => {
            return a.priority - b.priority;
        })
    }

    function deleteTask(index){
        this.tasks.splice(index, 1)
    }

    return{
        name: name,
        isCurrentProj,
        tasks,
        sortTasks,
        addTask,
        deleteTask
    }
}

let projects = {

    projectList: [],
    currentProj: undefined,

    setCurrentProj: function(){
        this.currentProj = this.projectList.find(proj => proj.isCurrentProj === true)
    },

    resetCurrentProj: function(){
        this.projectList.forEach(proj => {
            proj.isCurrentProj = false
        })
    },

    deleteProject: function(index){
        this.projectList.splice(index, 1)
    }


}

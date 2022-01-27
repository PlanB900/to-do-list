export {createProject}

function createProject(name) {

    let toDos = []

    function addToDo(obj) {
        this.toDos.push(obj)
    }

    function sortToDo( array ){
        array.sort(function (a,b) {
            return a.priority - b.priority;
        })
    }

    return{
        name: name,
        toDos,
        sortToDo
    }
}
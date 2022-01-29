export {createTasks}

function createTasks(name, description, priority, dueDate){
    

    return {
        name: name,
        description: description,
        priority: priority,
        dueDate
    }
}
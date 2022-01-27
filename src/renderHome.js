export {renderHome}

function renderHome(){
    let content = document.getElementById('content')

    let title = document.createElement('div')
    title.id = 'title'
    title.textContent = "To-Do List."

    let block1 = document.createElement('div')
    block1.id = "block1"

    let getStartedBtn = document.createElement('button')
    getStartedBtn.id = 'getStartedBtn'
    getStartedBtn.textContent = 'Get Started'

    content.appendChild(block1)
    block1.appendChild(title)
    block1.appendChild(getStartedBtn)
}
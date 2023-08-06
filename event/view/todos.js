

let template


const getNewTodoNode = () => { 
    if (!template) {
        template = document.getElementById('todo-item')
    }

    return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index) =>{
    const {text, completed} = todo

    const element =getNewTodoNode()
    

    element.querySelector('input.edit').value = text;
    element.querySelector('label').textContent = text; 

    if (completed){
        element.classList.add('completed')
        element.querySelector('input.toggle').checked=true;
    }
    else {
        if (element.classList.contains('completed')){
            element.classList.remove('completed')
        }
        element.querySelector('input.toggle').checked=false;
    }

    element.querySelector('button.destroy').dataset.index =index
    element.querySelector('input.toggle').dataset.index =index

    return element
}

export default (targetElement, state , events) =>{

    const {deleteItem,toggleCompleted} = events;
    const {todos} = state

    const newTodoList = targetElement.cloneNode(true);

    newTodoList.innerHtml = ''

    todos
        .map((todo,index)=>getTodoElement(todo,index))
        .forEach(element=>{
            newTodoList.appendChild(element)
        })
    
    newTodoList.addEventListener('click', (e)=>{
        if (e.target.matches('button.destroy')){
            deleteItem(e.target.dataset.index)
        }
        if (e.target.matches('input.toggle')){
            toggleCompleted(e.target.dataset.index)
        }
    })

    return newTodoList
}
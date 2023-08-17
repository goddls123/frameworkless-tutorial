import eventCreators from "../model/eventCreators.js"

let template


const getNewTodoNode = () => { 
    if (!template) {
        template = document.getElementById('todo-item')
    }

    return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index, dispatch) =>{
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

    attachEventsToTodoElement(element,index,dispatch)

    return element
}


const attachEventsToTodoElement = (element,index,dispatch)=>{
    element
    .addEventListener('dblclick', () => {
        element.classList.add('editing')
        element
        .querySelector('input.edit').focus()
    })

    element
    .querySelector('input.edit')
    .addEventListener('keydown', e => {
        if (e.key === 'Enter') {
        element.classList.remove('editing')
        dispatch(eventCreators.updateItem(index, e.target.value))
        }

        if (e.key === 'Escape') {
            element.classList.remove('editing')
        }
    })
}
const filterTodos = (todos,currentFilter)=>{

    const todoList = todos.map((todo,index) => {return {...todo ,index}})
    const isCompleted = todo => todo.completed
    if (currentFilter === 'Active'){
        return todoList.filter(t => !isCompleted(t))
    }

    if (currentFilter === 'Completed'){
        return todoList.filter(t => isCompleted(t))
    }

    return [...todoList]
}

const attachEvents = (newTodoList,dispatch)=>{

    newTodoList.addEventListener('click', (e)=>{
        if (e.target.matches('button.destroy')){
            dispatch(eventCreators.deleteItem(parseInt(e.target.dataset.index)))
        }
        if (e.target.matches('input.toggle')){
            dispatch(eventCreators.toggleComplete(parseInt(e.target.dataset.index)))
        }
    })
}

export default (targetElement, state , dispatch) =>{

    const {todos,currentFilter} = state

    const newTodoList = targetElement.cloneNode(true);

    newTodoList.innerHtml = ''

    const filterdTodos = filterTodos(todos, currentFilter)

    filterdTodos
        .map((todo)=>getTodoElement(todo,todo.index, dispatch))
        .forEach(element=>{newTodoList.appendChild(element)})
    
    attachEvents(newTodoList,dispatch)

    return newTodoList
}
import getTodos from "./getTodos.js";
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import todosView from './view/todos.js'


const state ={
    todos :getTodos(),
    currentFilter : 'All'
}

const main = document.querySelector('.todoapp')

window.requestAnimationFrame(()=>{
    const newMain = view(main, state)
    main.replaceWith(newMain)
})

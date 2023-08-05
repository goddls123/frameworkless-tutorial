import getTodos from "./getTodos.js";
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import todosView from './view/todos.js'
import registry from "./registry.js";
import applyDiff from "./applyDiff.js";

const state ={
    todos :getTodos(),
    currentFilter : 'All'
}

registry.add('filters',filtersView)
registry.add('counter',counterView)
registry.add('todos',todosView)






const render =()=>{
    window.requestAnimationFrame(()=>{
        const main = document.querySelector('.todoapp')
        const newMain = registry.renderRoot(main, state)
        applyDiff(document.body,main,newMain)
    })
}


render()
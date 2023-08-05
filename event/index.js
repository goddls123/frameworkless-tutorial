import appView from "./view/app.js";
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import todosView from './view/todos.js'
import registry from "./registry.js";
import applyDiff from "./applyDiff.js";

const state ={
    todos :[],
    currentFilter : 'All'
}


registry.add('app',appView)
registry.add('filters',filtersView)
registry.add('counter',counterView)
registry.add('todos',todosView)



events ={
    addItem: (text)=>{
        state.todos.push({
            text,
            completed:fase
        })
        render()
    },
    deleteItem: (index)=>{
        state.todos.splice(index,1)
        render()
    }
}


const render =()=>{
    window.requestAnimationFrame(()=>{
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot(main, state,events)
        applyDiff(document.body,main,newMain, events)
    })
}


render()
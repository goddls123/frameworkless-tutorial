import appView from "./view/app.js";
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import todosView from './view/todos.js'
import registry from "./registry.js";
import applyDiff from "./applyDiff.js";

import modelFactory from "./model/model.js"
import eventBusFactory from "./model/eventBus.js";


registry.add('app',appView)
registry.add('filters',filtersView)
registry.add('counter',counterView)
registry.add('todos',todosView)


const loadState = ()=>{
    const seriallizedState = window.localStorage.getItem('state')

    if (!seriallizedState){
        return
    }

    return JSON.parse(seriallizedState)
}

const model =modelFactory(loadState())

const eventBus = eventBusFactory(model)

const render =(state)=>{
    window.requestAnimationFrame(()=>{
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot(main, state, eventBus.dispatch)
        applyDiff(document.body,main,newMain)
    })
}

eventBus.subscribe(render)

eventBus.subscribe(state => {
    Promise.resolve().then(()=>{
        window.localStorage.setItem('state', JSON.stringify(state))
    })
})

render(eventBus.getState())

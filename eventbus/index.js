import appView from "./view/app.js";
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import todosView from './view/todos.js'
import registry from "./registry.js";
import applyDiff from "./applyDiff.js";

import modelFactory from "./model/model.js"


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

const {addChangeListener, ...events} = model


const render =(state)=>{
    window.requestAnimationFrame(()=>{
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot(main, state, events)
        applyDiff(document.body,main,newMain)
    })
}

addChangeListener(render)

addChangeListener(state => {
    Promise.resolve().then(()=>{
        window.localStorage.setItem('state', JSON.stringify(state))
    })
})
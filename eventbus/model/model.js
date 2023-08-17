import todoModifier from './todos.js'
import filterModifer from './filter.js'

const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    todos: [],
    currentFilter: 'All'
}







export default (initialState =INITIAL_STATE) =>{
    return (prevState, event)=>{
        if (!prevState){
            return cloneDeep(initialState)
        }
        const {todos,currentFilter} = prevState

        const newTodos = todoModifier(todos,event)
        const newCurrentFilter = filterModifer(currentFilter, event)
        

        if (newTodos === todos && newCurrentFilter === currentFilter){
            return prevState
        }

        return {
            todos:newTodos,
            currentFilter:newCurrentFilter
        }

    }
}
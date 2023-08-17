const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    todos: [],
    currentFilter: 'All'
}


const addItem =(state, event)=>{
    const {text} = event.payload

    if (!text){
        return state
    }
    return  {
            ...state, 
            todos:[...todos, {
                text,
                completed:false
            }]}
}


const deleteItem = (state, event)=>{
    const index = event.payload

    if (index < 0){
        return state
    }

    if(!state.todos[index]){
        return state
    }

    return {...state,
            todos: state.todos.filter((todo,i)=> i!==index)
        }
}

const toggleCompleted = (state, event) =>{
    const index = event.payload

    if (index < 0){
        return state
    }

    if(!state.todos[index]){
        return state
    }

    return {
        ...state,
        todos:state.todos.map((todo,i)=>{
            if (i === index) {
                todo.completed = !todo.completed
            }
            return todo
        })
    }
}

const completeAll = (state, event)=>{
    return {
        ...state,
        todos:state.todos.map(todo => {
            todo.completed = true
            return todo
        })
    }
}


const clearCompleted = (state, event)=>{
    return {
        ...state,
        todos:state.todos.filter(todo => !todo.completed)
    }
}

const updateItem = (state, event) =>{
    const {index, text} =event.payload

    if (!text){
        return state
    }

    if (index < 0){
        return state
    }

    if(!state.todos[index]){
        return state
    }   

    return {
        ...state,
        todos: state.todos.map((todo,i)=>{
            if (i === index){
                todo.text = text
            }
            return todo
        })
    }
}

const changeFilter = (state, event)=>{
    return {
        ...state,
        currentFilter:event.payload
    }
}

const methods ={
    ITEM_ADDED:addItem,
    ITEM_UPDATED:updateItem,
    ITEM_DELETED: deleteItem,
    ITEMS_COMPLETED_TOGGLED: toggleCompleted,
    ITEMS_MARKED_AS_COMPLETED: completeAll,
    COMPLETED_ITEM_DELETED: clearCompleted,
    FILTER_CHANGED: changeFilter
}

export default (initialState =INITIAL_STATE) =>{
    return (prevState, event)=>{
        if (!prevState){
            return cloneDeep(initialState)
        }

        const currentModifier = methods(event.type)

        if (!changeFilter){
            return prevState
        }

        return currentModifier(prevState,currentModifier)

    }
}
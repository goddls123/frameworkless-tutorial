const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    todos: [],
    currentFilter: 'All'
}

export default (initialState =INITIAL_STATE) =>{
    const state = cloneDeep(initialState)
    let listeners = [];

    const addChangeListener = listener =>{
        listeners.push(listener)

        listener(freeze(state))

        return ()=>{
            listeners = listeners.filter(l => l!==listener)
        }
    }

    const invokeListners = ()=>{
        const data = freeze(state)
        listeners.forEach(listener => listener(data))
    }  
    
    const getState = ()=>{
        return Object.freeze(cloneDeep(state))
    }

    const addItem =(text)=>{

        if (!text){
            return
        }

        state.todos.push({
            text,
            completed:false
        })
        invokeListners()
    }

    const deleteItem = (index)=>{
        if (index < 0){
            return
        }

        if(!state.todos[index]){
            return
        }

        state.todos.splice(index,1)
        invokeListners()
    }
    
    const toggleCompleted = (index) =>{
        if (index < 0){
            return
        }

        if(!state.todos[index]){
            return
        }

        state.todos[index].completed = !state.todos[index].completed
        invokeListners()
    }

    const clearCompleted = ()=>{
        state.todos = state.todos.filter(todo => !todo.completed)    
        invokeListners()
    }

    const updateItem = (index, text) =>{
        if (!text){
            return
        }

        if (index < 0){
            return
        }

        if(!state.todos[index]){
            return
        }   

        state.todos[index].text = text
        invokeListners()
    }

    const completeAll = ()=>{
        state.todos.forEach(todo =>{ todo.completed = true })
        invokeListners()
    } 

    const changeFilter = (filter)=>{
        state.currentFilter=filter
        invokeListners()
    }


    return {
        addItem,
        updateItem,
        deleteItem,
        toggleCompleted,
        completeAll,
        clearCompleted,
        getState,
        changeFilter,
        addChangeListener
    }
}
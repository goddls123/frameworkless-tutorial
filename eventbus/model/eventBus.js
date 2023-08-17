const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    todos: [],
    currentFilter: 'All'
}

export default (model) =>{
    let listeners = [];
    let state = model()

    const subscribe = listener =>{
        listeners.push(listener)

        return ()=>{
            listeners = listeners.filter(l => l!==listener)
        }
    }

    const invokeSubscribers = ()=>{
        const data = freeze(state)
        listeners.forEach(listener => listener(data))
    }  
    
    const getState = () => freeze(cloneDeep(state))
    

    const dispatch = event =>{
        const newState = model(state,event)

        if (!newState){
            throw new Error('model should always return a value')
        }
        
        if (newState === state){
            return
        }

        invokeSubscribers()
    }


    return {
        getState,
        subscribe,
        dispatch
    }
}
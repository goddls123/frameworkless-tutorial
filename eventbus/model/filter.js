

const changeFilter = (state, event)=>{
    return event.payload
}

const methods ={
    FILTER_CHANGED: changeFilter
}

export default  (prevState, event)=>{

    if (!event){
        return []
    }


    const currentModifier = methods[event.type]
    
    if(!currentModifier){
        return prevState
    }
    
    return currentModifier(prevState,event)

}

import eventCreators from "../model/eventCreators.js";




export default (targetElement, {currentFilter}, dispatch) =>{

    const newFilters = targetElement.cloneNode(true);

    Array
        .from(newFilters.querySelectorAll('li a'))
        .forEach(a=>{
            if(a.textContent === currentFilter)
                a.classList.add('selected')
            else    
                a.classList.remove('selected')
        })
    
    newFilters.addEventListener('click', (e)=>{
        if (e.target.matches('a')){
            e.preventDefault()
            dispatch(eventCreators.changeFilter(e.target.textContent))
        }
    })
    
    return newFilters
}





export default (targetElement, {currentFilter}, events) =>{

    const newFilters = targetElement.cloneNode(true);
    const {changeFilter} = events

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
            changeFilter(e.target.textContent)
        }
    })
    
    return newFilters
}
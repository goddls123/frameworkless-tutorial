




export default (targetElement, {currentFilter}, events) =>{

    const newFilters = targetElement.cloneNode(true);
    const {clearCompleted} = events

    Array.from(newFilters.querySelectorAll('li a'))
        .forEach(a=>{
            if(a.textContent === currentFilter)
                a.classList.add('selected')
            else    
                a.classList.remove('selected')
        })

    return newFilters
}
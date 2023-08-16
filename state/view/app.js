let template

const getTemplate = () => { 
    if (!template) {
        template = document.getElementById('todo-app')
    }

    return template.content.firstElementChild.cloneNode(true)
 }

 const addEvents = (targetElement , events)=>{
    const {clearCompleted, addItem ,completeAll} = events

    targetElement.querySelector('.new-todo').addEventListener('keypress', e=>{
        if (e.key === 'Enter'){
            addItem(e.target.value)
            e.target.value =''
        }
    })

    targetElement.querySelector('button.clear-completed').addEventListener('click', clearCompleted)

    targetElement.querySelector('input.toggle-all').addEventListener('click', completeAll)

}


 export default (targetElement,state, events) => { 
    const newApp =targetElement.cloneNode(true)
    
    newApp.innerHTML = ''
    newApp.appendChild(getTemplate())
    
    addEvents(newApp, events)

    return newApp
  }
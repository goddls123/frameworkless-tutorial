let template

const getTemplate = () => { 
    if (!template) {
        template = document.getElementById('todo-app')
    }

    return template.content.firtElementChild.cloneNode(true)
 }

 const addEvents = (targetElement , events)=>{
    targetElement.querySelector('.new-todo').addEventListner('keypress', e=>{
        if (e.key === 'Enter'){
            events.addItem(e.target.value)
            e.target.value =''
        }
    })
 }


 export default (targetElement,state, events) => { 
    const newApp =targetElement.cloneNode(true)

    newApp.innerHtml = ''
    newApp.appendChild(getTemplate())

    addEvents(newApp,events)

    return newApp
  }
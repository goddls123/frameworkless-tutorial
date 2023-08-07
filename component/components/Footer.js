
//counter 와 filter로 component 분리

import { EVENTS } from "../events.js";

const getTodoCount = todos =>{
    const notCompleted = todos.filter(todo => !todo.completed);

    const {length} = notCompleted;

    if(length===1){
        return `1 Item left`
    }

    return `${length} Items left`
}


export default class Footer extends HTMLElement {
    static get observedAttributes(){
        return ['todos','filter']
    }
    get todos () {
        if (!this.hasAttribute('todos')) {
        return []
        }
    
        return JSON.parse(this.getAttribute('todos'))
    }
    
    set todos (value) {
        this.setAttribute('todos', JSON.stringify(value))
    }
    
    get filter () {
    return this.getAttribute('filter')
    }

    set filter (value) {
    this.setAttribute('filter', value)
    }


    changeFilter(text){
        const event = new CustomEvent(
                EVENTS.CHANGE_FILTER,
                {
                    detail: {
                        text
                    }
                }
            )

        this.dispatchEvent(event)
    }

    updateCounter(){
        this.querySelector('span.todo-count').textContent = getTodoCount(this.todos)
    }

    updateFilter(){
        this
        .querySelectorAll('li a')
        .forEach(a=>{
            if(a.textContent === this.filter)
                a.classList.add('selected')
            else    
                a.classList.remove('selected')
        })
    }


    connectedCallback() {
        const template = document.getElementById('footer')

        const content = template.content.firstElementChild.cloneNode(true)

        this.appendChild(content)


        this.updateCounter()
        this.updateFilter()

        this.addEventListener('click', (e)=>{
            if (e.target.matches('a')){
                this.changeFilter(e.target.textContent)
            }
        })
    }

    attributeChangedCallback(){
        this.updateCounter()
        this.updateFilter()
    }

}
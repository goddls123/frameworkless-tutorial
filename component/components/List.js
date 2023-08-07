
const TEMPLATE = `<ul class="todo-list"></ul>`

import { EVENTS } from "../events.js"


export default class List extends HTMLElement{
    static get observedAttributes(){
        return ['todos', 'filter']
    }
    
    _todos = []

    get todos (){
        return this._todos
    }

    set todos (value){
        this._todos = value
    }

    get filter(){
        return this._filter
    }

    set filter(value){
        this._filter = value
    }   

    onDeleteClick (index){
        const event = new CustomEvent(
            EVENTS.DELETE_ITEM,
            {
                detail: {
                    index
                }
            }
        )
        this.dispatchEvent(event)
    }

    onToggleClick (index){
        const event = new CustomEvent(
            EVENTS.TOGGLE_COMPLETED,
            {
                detail: {
                    index
                }
            }
        )
        this.dispatchEvent(event)
    }

    

    updateList(){
        this.list.innerHTML = ''

        this.todos
        .filter(todo =>{
            if (this.filter === 'All'){
                return true
            }
            
            return this.filter === 'Completed' ? todo.completed :!todo.completed 
        })
        .map((todo,index)=>this.getTodoElement(todo,index))
        .forEach(element=>{this.list.appendChild(element)})
    }

    getNewTodoNode = () => { 
        if (!template) {
            template = document.getElementById('todo-item')
        }
    
        return template.content.firstElementChild.cloneNode(true)
    }

    getTodoElement (todo, index){
        const {text, completed} = todo
    
        const element =getNewTodoNode()
        
    
        element.querySelector('input.edit').value = text;
        element.querySelector('label').textContent = text; 
    
        if (completed){
            element.classList.add('completed')
            element.querySelector('input.toggle').checked=true;
        }
        else {
            if (element.classList.contains('completed')){
                element.classList.remove('completed')
            }
            element.querySelector('input.toggle').checked=false;
        }
    
        element.querySelector('button.destroy').dataset.index =index
        element.querySelector('input.toggle').dataset.index =index
    
        return element
    }
    


    connectedCallback(){
        this.innerHTML = TEMPLATE
        this.itemTemplate = document.getElementById('todo-item')

        this.list = this.querySelector('ul')

        this.list.addEventListener('click', e =>{
            if (e.target.matches('button.destroy')){
            this.onDeleteClick(e.target.dataset.index)
        }
        if (e.target.matches('input.toggle')){
            this.onToggleClick(e.target.dataset.index)
        }
        })
    }


    attributeChangedCallback(){
        this.updateList()
    }
}
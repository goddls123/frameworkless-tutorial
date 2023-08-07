
import { EVENTS } from "./List"


export default class App extends HTMLElement {

    constructor(){
        super()
        this.state = {
            todos :[],
            currentFilter : 'All'
        }

        this.template = document.getElementById('todo-app')
    }

    deleteItem(index){
        this.state.todos.splice(index,1)
        this.setState()
    }

    toggleCompleted(index){
        this.state.todos[index].completed = !this.state.todos[index].completed
    }
    
    addItem(text){
        state.todos.push({
            text,
            completed:false
        })
        this.setState()
    }

    setState ( ){
        this.list.todos = this.state.todos
        this.list.filter= this.state.currentFilter
        // this.footer.todos = this.state.todos
        // this.footer.filter = this.state.currentFilter
    }

    connectedCallback(){
        window.requestAnimationFrame(()=>{
            const content = this.template.content.firstElementChild.cloneNode(true)

            this.appendChild(content)

            this.querySelector('.new-todo')
                .addEventListener('click',(e)=>{
                    if (e.key === 'Enter'){
                        this.addItem(e.target.value)
                        e.target.value =''
                    }
                })

            // this.footer = this.querySelector('todomvc-footer')

            this.list = this.querySelector('todomvc-list')
            this.list.addEventListener(EVENTS.DELETE_ITEM, e =>{
                this.deleteItem(e.detail.index)
            })
            this.list.addEventListener(EVENTS.TOGGLE_COMPLETED, e =>{
                this.toggleCompleted(e.detail.index)
            })
        })

        this.setState()
    }
}
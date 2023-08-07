
// 추우에 eventListner 정리 및 입력 부분과 버튼 부분 컴포넌트
//처음에 List rendering 2번 되는 부분

import { EVENTS } from "../events.js"


export default class App extends HTMLElement {

    constructor(){
        super()
        this.state = {
            todos :[],
            currentFilter : 'All'
        }
        this.template = document.getElementById('todo-app')
    }

    clearCompleted (){
        this.state.todos = this.state.todos.filter(todo => !todo.completed)    
        this.setTodos()
    }

    deleteItem(index){
        this.state.todos.splice(index,1)
        this.setTodos()
    }

    toggleCompleted(index){
        this.state.todos[index].completed = !this.state.todos[index].completed
        this.setTodos()
    }
    
    addItem(text){
        this.state.todos.push({
            text,
            completed:false
        })
        this.setTodos()
    }

    changeFilter(filter) {
        this.state.currentFilter=filter
        this.setFilter()
    }

    setFilter(){
        this.list.filter= this.state.currentFilter
        this.footer.filter = this.state.currentFilter
    }

    setTodos(){
        this.list.todos = this.state.todos
        this.footer.todos = this.state.todos
    }
    
    setState ( ){
        this.setFilter()
        this.setTodos()
    }

    connectedCallback(){
        window.requestAnimationFrame(()=>{
            const content = this.template
            .content
            .firstElementChild
            .cloneNode(true)

            this.appendChild(content)
            

            this.querySelector('.new-todo')
                .addEventListener('keypress',(e)=>{
                    if (e.key === 'Enter'){
                        this.addItem(e.target.value)
                        e.target.value =''
                    }
                })

            this.querySelector('button.clear-completed').addEventListener('click', e =>{
                this.clearCompleted()
            })

            this.footer = this.querySelector('todomvc-footer')

            this.list = this.querySelector('todomvc-list')


            this.list.addEventListener(EVENTS.DELETE_ITEM, e =>{
                this.deleteItem(e.detail.index)
            })
            this.list.addEventListener(EVENTS.TOGGLE_COMPLETED, e =>{
                this.toggleCompleted(e.detail.index)
            })

            this.footer.addEventListener(EVENTS.CHANGE_FILTER, e=>{
                this.changeFilter(e.detail.text)
            })
        
            this.setState()
        })
    }

}
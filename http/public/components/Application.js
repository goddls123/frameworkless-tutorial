
// 추우에 eventListner 정리 및 입력 부분과 버튼 부분 컴포넌트
//처음에 List rendering 2번 되는 부분

import { EVENTS } from "../events.js"

import http from '../http/axios.js'

const BASE_URL = '/api/todos'

export default class App extends HTMLElement {

    constructor(){
        super()
        this.state = {
            todos :[],
            currentFilter : 'All'
        }
        this.template = document.getElementById('todo-app')
    }

    async clearCompleted (){
        const url = `/api/delete`

        http.delete(url)

        await this.getTodoList()
    }

    async deleteItem(index){
        const url = `${BASE_URL}/${this.state.todos[index].id}`

        http.delete(url,this.state.todos[index])

        await this.getTodoList()
    }

    async toggleCompleted(index){
        const url = `${BASE_URL}/${this.state.todos[index].id}`
        this.state.todos[index].completed = !this.state.todos[index].todos
        
        http.patch(url,this.state.todos[index])

        await this.getTodoList()
    }
    
    async addItem(text){
        http.post(BASE_URL,{text,completed:false})
        await this.getTodoList()
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

    async getTodoList(){
        this.state.todos = await http.get(BASE_URL)
        this.setTodos()
    }

    connectedCallback(){
        window.requestAnimationFrame( async ()=>{
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


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
    }
    addItem(text){
        state.todos.push({
            text,
            completed:false
        })
    }

    syncAttributes ( ){
        this.list.todos = this.state.todos
        this.footer.todos = this.state.todos
        this.footer.filter = this.state.currentFilter
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

            this.footer = this.querySelector('todomvc-footer')

            this.list = this.querySelector('todomvc-list')
        })
    }
}
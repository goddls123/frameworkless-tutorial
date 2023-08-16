import modelFactory from './model.js'


let model

describe('TodoMVC Model', () => { 
    beforeEach(()=>{
        model = modelFactory()
    })

    test('data should be immutable', () => { 
        expect (()=>{
            model.getState().currentFilter = 'WRONG'
        }).toThrow()
    })    

    test('should add an item', () => { 
        model.addItem('')
        model.addItem(undefined)
        model.addItem(0)
        model.addItem(null)
        model.addItem(false)
        model.addItem()

        const {todos} = model.getState()

        expect(todos.length).toBe(0)
    })
    
    test('should update item', () => { 
        model.addItem('dummy')

        model.updateItem(0, 'new-dummy')

        const {todos} = model.getState()

        expect(todos[0].text).toBe('new-dummy')
    })

    test('should not upadate an item when an invalid index is provided', () => { 
        model.addItem('dummy')
        
        model.updateItem(1, 'new-dummy')

        const {todos} = model.getState()

        expect(todos[0].text).toBe('dummy')
    })
})
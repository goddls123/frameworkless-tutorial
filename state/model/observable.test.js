import modelFactory from './model.js'


let model


describe('observable model', () => { 
    beforeEach(()=>{
        model = modelFactory()
    })

    test('listners should be invoked immediately', () => { 
        let counter = 0;
        model.addChangeListener(data =>{
            counter++;
        })

        expect(counter).toBe(1)
    })


    test('listners shoud be invoked when changeing data', () => { 
        let counter = 0;
        model.addChangeListener(data =>{
            counter++;
        })

        model.addItem('dummy')

        expect(counter).toBe(2)
    })

    test('listners should be removed when unsubscribing', () => { 
        let counter = 0

        const unsubscribe = model.addChangeListener(data =>{
            counter++;
        })

        unsubscribe()

        model.addItem('dummy')

        expect(counter).toBe(1)
    })

    test('state should be immutable', () => { 
        model.addChangeListener(data=>{
            expect(()=>{
                data.currentFilter = 'WRONG'
            }).toThrow()
        })
    })
})
import eventBusFactory from "./eventBus";

let eventBus;
let counter

const counerModel = (state, event)=>{
    if (!event){
        return {
            counter:0
        }
    }

    if (event.type !== 'COUNTER'){
        return state
    }

    return {
        counter : state.counter++
    }
}


describe('eventBus', () => { 
    beforeEach(()=>{
        eventBus = eventBusFactory(counerModel)
        counter = 0
    })

    test('subscribers should be invoked when the model catch the event', () => { 

        eventBus.subscribe(()=> counter++)

        expect(counter).toBe(0)

        eventBus.dispatch({type:"COUNTER"})

        expect(counter).toBe(1)
    })

    test('subscribers should not be invoked when the model dose not catch the event', () => { 

        eventBus.subscribe(()=> counter++)

        expect(counter).toBe(0)

        eventBus.dispatch({type:"NOT"})

        expect(counter).toBe(0)
    })

    test('subscribers should receive an immutable state', () => { 
        eventBus.dispatch({type:"COUNTER"})

        eventBus.subscribe((state)=> {
            expect(()=>{
                state.counter=0
            }).toThrow()
        })
    })

    test('should throw error in the model dos not return a state', () => { 
        const eventBus =eventBusFactory(()=>{
            return undefined
        })

        expect(()=>{
            eventBus.dispatch({type:"COUNTER"})
        }).toThrow()
    })
})

const registry = {}

const add =(name, component)=>{
    registry[name] =renderWrapper(component);
}

const renderRoot = (root,state, events)=>{
    const cloneComponent = root =>{
        return root.cloneNode(true);
    }
    const result = renderWrapper(cloneComponent)(root, state,events)
    console.log(result)
    return result
}


const renderWrapper = component=>{
    return (targetElement,state, events)=>{
        const element = component(targetElement,state, events)

        const childComponents =element.querySelectorAll('[data-component]')

        if (childComponents){
            console.log(childComponents)
        }
        Array
            .from(childComponents)
            .forEach(target =>{
                const name = target.dataset.component
                
                const child = registry[name]

                if(!child){
                    return
                }
                
                target.replaceWith(child(target, state, events))
                // console.log(target)
            })
            
        return element
    }
}


export default {add, renderRoot}
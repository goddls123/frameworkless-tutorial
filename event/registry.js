
const registry = {}

const add =(name, component)=>{
    registry[name] =renderWrapper(component);
}

const renderRoot = (root,state)=>{
    const cloneComponent = root =>{
        return root.cloneNode(true);
    }

    return renderWrapper(cloneComponent)(root, state)
}


const renderWrapper = component=>{
    return (targetElement,state)=>{
        const element = component(targetElement,state)

        const childComponents =element.querySelectorAll(['data-component'])

        const child = Array.from(childComponents)
                            .forEach((target)=>{
                                const name = target.dataset.component
                                
                                const child = registry[name]

                                if(!child){
                                    return
                                }

                                target.replaceWith(child(target, state))
                            })
        
        return element
    }
}


export default {add, renderRoot}
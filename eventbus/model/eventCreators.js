const EVENT_TYPES = Object.freeze({
    ITEM_ADDED: 'ITEM_ADDED',
    ITEM_UPDATED: 'ITEM_UPDATED',
    ITEM_DELETED: 'ITEM_DELETED',
    ITEMS_COMPLETED_TOGGLED: 'ITEMS_COMPLETED_TOGGLED',
    ITEMS_MARKED_AS_COMPLETED: 'ITEMS_MARKED_AS_COMPLETED',
    COMPLETED_ITEM_DELETED: 'COMPLETED_ITEM_DELETED',
    FILTER_CHANGED: 'FILTER_CHANGED'
})


export default  {
    addItem: text =>({
        type: EVENT_TYPES.ITEM_ADDED,
        payload :text
    }),
    updateItem:(index, text) => ({
        type:EVENT_TYPES.ITEM_UPDATED,
        payload: {index,text}
    }),
    deleteItem:(index) =>({
        type:EVENT_TYPES.ITEM_DELETED,
        payload:index
    }),
    toggleComplete:(index)=>({
        type:EVENT_TYPES.ITEMS_COMPLETED_TOGGLED,
        payload:index
    }),
    completeAll:()=>({
        type:EVENT_TYPES.ITEMS_COMPLETED_TOGGLED
    }),
    clearCompleted:()=>({
        type: EVENT_TYPES.COMPLETED_ITEM_DELETED
    }),
    changeFilter: filter => ({
        type: EVENT_TYPES.FILTER_CHANGED,
        payload:filter
    })

}
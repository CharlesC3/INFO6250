export const initialState = {
    newDate:'',
    newAddress:'',
    newAmount:'',
    newCategory:'Other',
    newDescription:'',
    inputError:'',
}

export function reducer(state, action){
    switch(action.type){
        case 'clearInputFields':
            return{
                newDate:'',
                newAddress:'',
                newAmount:'',
                newCategory:'Other',
                newDescription:'',
                inputError:'',
            };
        case'setNewDate':
            return{
                ...state,
                newDate: action.input
            };
        case'setNewAddress':
            return{
                ...state,
                newAddress: action.input
            };
        case'setNewCategory':
            return{
                ...state,
                newCategory: action.input
            };
        case'setNewAmount':
            return{
                ...state,
                newAmount: action.input
            };
        case'setNewDescription':
            return{
                ...state,
                newDescription: action.input
            };
        case'setInputError':
            return{
                ...state, 
                inputError: action.inputError
            };
        default:
            return state;
    }
}
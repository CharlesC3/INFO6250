export const initialState ={
    username:'',
    bills:{},
    isLoaded:false,
    error:'',
}

export function reducer(state, action){
    switch(action.type){
        case'login':
            return{
                ...state,
                error:'',
                username: action.username,
                bills: action.bills,
                isLoaded: true,
            };
        case'logout':
            return{
                ...state,
                error:'',
                username:'',
                bills:{},
                isLoaded: false,
            };
        case'addBill':
            return{
                ...state,
                error:'',
                bills:{
                    ...state.bills,
                    [action.newBill.id]:{
                        ...action.newBill,
                    }
                }
            };
        case'deleteBill':
            const newBills = {...state.bills};
            delete newBills[action.id];
            return{
                ...state,
                error:'',
                bills:{
                    ...newBills
                }
            };
        case'updateBill':
            return{
                ...state,
                error:'',
                bills:{
                    ...state.bills,
                    [action.id]:{
                        ...state.bills[action.id],
                        category: action.category,
                    }
                }
            };
        case'showError':
            return{
                ...state,
                error: action.error
            };
        default:
            return state;    
    }
}
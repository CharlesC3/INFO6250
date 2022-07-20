import{useReducer, useContext} from 'react';
import {reducer, initialState} from '../add-reducer';
import {getInputError} from '../errors';
import BillList from './BillList';
import ListContext from './ListContext';
import '../CSS/Content.css';


function Content({username, bills, error}){
    const {handleLogout, handleNewBill} = useContext(ListContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    

    function onSubmitLogout(e){
        e.preventDefault();
        handleLogout();
    }

    function onSubmitBill(e){
        e.preventDefault();
        const trimmedDate = state.newDate.trim();
        const trimmedAddress = state.newAddress.trim();
        const trimmedAmount = state.newAmount.trim();
        const trimmedDescription = state.newDescription.trim();
        const newCategory = state.newCategory;

        const inputError = getInputError(trimmedAddress, trimmedAmount, trimmedDate);
        if(inputError){
            dispatch({type: 'setInputError', inputError});
        }else{
            handleNewBill(trimmedDate, trimmedAddress, newCategory, trimmedAmount, trimmedDescription);
            dispatch({type: 'clearInputFields'});
        }
    }

    

    return(
        <div className='content'>
            <div className='header'>
                {error && <span className='error'>{error}</span>}
                <span className='headerUser'>{username}</span>
                <button id='logoutBtn' onClick={onSubmitLogout}>Logout</button>
            </div>

            <div className='billArea'>
                
                <BillList bills={bills}/>
                <form className='newBill' onSubmit={onSubmitBill}>
                    <h1>New Bill</h1>
                    <label><span>Date:</span><br/>
                        <input value = {state.newDate} onChange={(e)=>dispatch({type: 'setNewDate', input: e.target.value})} placeholder="mm/dd/yyyy" required/>
                    </label><br/>
                    <label><span>Address:</span><br/>
                        <input value = {state.newAddress} onChange={(e)=>dispatch({type: 'setNewAddress', input: e.target.value})} required/>
                    </label><br/>
                    <label><span>Category:</span>
                        <select value = {state.newCategory} onChange = {(e) => dispatch({type : 'setNewCategory', input: e.target.value})}>
                            <option value="Food">Food</option>
                            <option vlaue="Transportation">Transportation</option>
                            <option value="Rent-and-Utility">Rent and Utility</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </label><br/>
                    <label><span>Amount($):</span><br/>
                        <input value = {state.newAmount} onChange={(e)=>dispatch({type: 'setNewAmount', input: e.target.value})} placeholder="Two decimal at most" required/>
                    </label><br/>
                    <label><span>Description:</span><br/>
                        <textarea row = "4" cols="20" value = {state.newDescription} onChange={(e)=>dispatch({type: 'setNewDescription', input: e.target.value})}/>
                    </label><br/>
                    <button type="submit" id="addBtn" value="Add">Add</button>
                    {state.inputError && <p className='errorMsg'>{state.inputError}</p>}
                </form>
                
            </div>
        </div>
    );
}

export default Content;
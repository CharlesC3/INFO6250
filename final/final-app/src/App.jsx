import {useEffect, useReducer} from 'react';
import {fetchSession, fetchLogin, fetchLogout, fetchBills, fetchUpdateBill, fetchAddBill, fetchDeleteBill} from './services';
import {reducer, initialState} from'./reducer';
import {getErrorMessage} from './errors';
import Login from'./components/Login';
import Content from './components/Content';
import ListContent from './components/ListContext';
import './App.css';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    fetchSession()
    .then(session =>{
      fetchBills()
      .then(bills =>{
        dispatch({type:'login', username: session.username, bills})
      })
      .catch(err =>{
        console.log(err.error);
        dispatch({type: 'showError', error: getErrorMessage({type : 'retriveBills'})});
      });
    })
    .catch(err =>{
      if(err.error !== 'auth-missing'){
        dispatch({type : 'showError', error: getErrorMessage({type: 'retriveSession'})});
      }
    });
  },[]);

  function handleLogin(username){
    fetchLogin(username)
    .then(bills =>{
      dispatch({type : 'login', username, bills});
    })
    .catch(err =>{
      if(err.error === 'auth-insufficient'){
        dispatch({type : 'showError', error:'Sorry, invalid username'});
      }else{
        dispatch({type: 'showError', error: getErrorMessage({type:'login'})});
      }
    });
  }

  function handleLogout(){
    fetchLogout()
    .then(()=>{
      dispatch({type: 'logout'});
    })
    .catch(err =>{
      console.log(err.error);
      dispatch({type :'showError', error: getErrorMessage({type: 'logout'})});
    });
  }

  function handleNewBill(date, address, category, amount, description){
    fetchAddBill({date, address, category, amount, description})
    .then(result=>{
      dispatch({type:'addBill', newBill:result});
    })
    .catch(err=>{
      console.log(err.error);
      dispatch({type:'showError', error: getErrorMessage({type: 'addBill', address, date})});
    });
  }

  function handleUpdateBill(id, date, address, category){
    const billToUpdate = state.bills[id];
    billToUpdate.category = category;
    fetchUpdateBill(id, billToUpdate)
    .then(()=>{
      dispatch({type : 'updateBill', id, category});
    })
    .catch(err => {
      console.log(err.error);
      dispatch({type:'showError', error: getErrorMessage({type:'updateBill', address, date})});
    });
  }

  function handleDeleteBill(id, date, address){
    fetchDeleteBill(id)
    .then(()=>{
      dispatch({type: 'deleteBill', id});
    })
    .catch(err=>{
      console.log(err.error);
      dispatch({type: 'showError', error: getErrorMessage({type:'deleteBill', address, date})});
    });
  }

  return (
    <div className="App">
      {state.username && !state.isLoaded && <span>Retrieving</span>}
      <ListContent.Provider value ={{
        handleLogin,
        handleLogout,
        handleNewBill,
        handleUpdateBill,
        handleDeleteBill,
      }}>
        {state.username && state.isLoaded && <Content username={state.username} bills = {state.bills} error={state.error}/>}
        {!state.username && <Login error={state.error}/>}
      </ListContent.Provider>
    </div>
  );
}

export default App;

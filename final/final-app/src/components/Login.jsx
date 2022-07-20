import {useState, useContext} from 'react';
import ListContext from './ListContext';
import '../CSS/Login.css'

function Login({error}){
    const [username, setUsername] = useState('');
    const {handleLogin} = useContext(ListContext);
    

    function onSubmit(e){
        e.preventDefault();
        const trimmedUsername = username.trim();
        if(!trimmedUsername){
            return;
        }
        handleLogin(trimmedUsername);
    }

    return(
        <div className = "loginPage">
            <div className='login'>
                <form onSubmit={onSubmit} className="formarea">
                    <h1>Welcome {username}</h1>
                    <label>Username:</label><br/>
                    <input id="loginInput" name="username" value={username} onInput={(e)=>setUsername(e.target.value)}/><br/>
                    <button type="submit" id="loginBtn" >Login</button>
                    {error && <p className='errorMsg'>{error}</p>}
                </form>
            </div>
        </div>
    );
};


export default Login;
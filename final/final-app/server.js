const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 4000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const sessions = require('./sessions');
const users = require('./users');
const bills = require('./bills');

function getSidAndUsername(req){
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    return {sid, username};
}

app.get('/api/session', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    res.json({username});
});

app.post('/api/session', (req, res) =>{
    const {username} = req.body;
    if(!username){
        res.status(400).json({error : 'required-username'});
        return;
    }
    if(username.toLowerCase() === 'dog' || /[^A-Za-z0-9_]+/g.test(username)){
        res.status(403).json({error : 'auth-insufficient'});
        return;
    }
    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if(!existingUserData){
        users.addUserData(username, bills.makeBillList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getBills());
});

app.delete('/api/session', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(sid){
        res.clearCookie('sid');
    }
    if(username){
        sessions.deleteSession(sid);
    }
    res.json({username});
});

app.get('/api/bills', (req, res) =>{
    const {sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    res.json(users.getUserData(username).getBills());
});

app.post('/api/bills', (req, res) => {
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const{date, address, amount, category, description} = req.body;
    if(!date || !address || !amount){
        res.status(400).json({error : 'required-inputs'});
        return;
    }
    const billList = users.getUserData(username);
    const id = billList.addBill({date, address, amount, category, description});
    res.json(billList.getBill(id));
});

app.patch('/api/bills/:id', (req, res) =>{
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const {date, address, amount, category, description} = req.body;
    const billList = users.getUserData(username);
    if(!billList.contains(id)){
        res.status(404).json({error : 'nonExistingId', message:`no bill wiht id ${id}`});
        return;
    }
    billList.updateBill(id, {date, address, amount, category, description});
    res.json(billList.getBill(id));
});

app.delete('/api/bills/:id', (req, res) =>{
    const{sid, username} = getSidAndUsername(req);
    if(!sid || !username){
        res.status(401).json({error : 'auth-missing'});
        return;
    }
    const {id} = req.params;
    const billList = users.getUserData(username);
    const exists = billList.contains(id);
    if(exists){
        billList.deleteBill(id);
    }
    res.json({message: exists ? `bill ${id} deleted` : `bill ${id} does not exist`}); 
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
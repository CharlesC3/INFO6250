import {useState, useEffect} from 'react';
import Bill from './Bill';
import Search from './Search';
import upIcon from '../pics/up.png';
import downIcon from '../pics/down.png';
import '../CSS/BillList.css';

function BillList({bills}){
    const [filter, setFilter] = useState('All');
    const [billRecordings, setBillRecordings] = useState([]);
    const [searchAddress, setSearchAddress] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    

    useEffect(()=>{
        let tempCount = 0;
        const newBill = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            if(filter === 'All' || curBill.category === filter){
                newBill.push(<Bill key={curBill.id} bill ={curBill}/>);
                tempCount += Number(curBill.amount) *100;
            }
        }
        setBillRecordings(newBill);
        setTotalAmount(tempCount / 100);
    },[filter, bills]
    );

    useEffect(()=>{
        let tempCount = 0
        const newBill = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            if(filter === 'All' || curBill.category === filter){
                if(curBill.address.toLowerCase().includes(searchAddress)){
                    newBill.push(<Bill key={curBill.id} bill ={curBill}/>);
                    tempCount += Number(curBill.amount) * 100;
                }
            }
        }
        setBillRecordings(newBill);
        setTotalAmount(tempCount / 100);
    },[searchAddress, filter, bills]
    );

    //the Whole list is showed in a reverse order, so the ascending function would show a descending effect
    function ascendingAmountSort(){
        const newBill = [];
        const temps = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            temps.push(curBill);
        }
        
        temps.sort((a, b) => a.amount - b.amount);
        for(let key in temps){
            if(filter === 'All' || temps[key].category === filter){
                if(temps[key].address.toLowerCase().includes(searchAddress)){
                    newBill.push(<Bill key={temps[key].id} bill={temps[key]}/>);
                }
            }
        }
        setBillRecordings(newBill);
    }

    function descendingAmountSort(){
        const newBill = [];
        const temps = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            temps.push(curBill);
        }
        
        temps.sort((a, b) => b.amount - a.amount);
        for(let key in temps){
            if(filter === 'All' || temps[key].category === filter){
                if(temps[key].address.toLowerCase().includes(searchAddress)){
                    newBill.push(<Bill key={temps[key].id} bill={temps[key]}/>);
                }
            }
        }
        setBillRecordings(newBill);
    }

    function dateToNum(d){
        d = d.split("/");
        return Number(d[2]+d[0]+d[1]);
    }

    function descendingDateSort(){
        const newBill = [];
        const temps = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            temps.push(curBill);
        }
        
        temps.sort((a, b) => {
            return dateToNum(a.date) - dateToNum(b.date);
        });
        for(let key in temps){
            if(filter === 'All' || temps[key].category === filter){
                if(temps[key].address.toLowerCase().includes(searchAddress)){
                    newBill.push(<Bill key={temps[key].id} bill={temps[key]}/>);
                }
            }
        }
        setBillRecordings(newBill);
    }

    function ascendingDateSort(){
        const newBill = [];
        const temps = [];
        for(let curBillKey in bills){
            const curBill = bills[curBillKey];
            temps.push(curBill);
        }
        
        temps.sort((a, b) => {
            return dateToNum(b.date) - dateToNum(a.date);
        });
        for(let key in temps){
            if(filter === 'All' || temps[key].category === filter){
                if(temps[key].address.toLowerCase().includes(searchAddress)){
                    newBill.push(<Bill key={temps[key].id} bill={temps[key]}/>);
                }
            }
        }
        setBillRecordings(newBill);
    }
    
    

    return(
        <div className = "billList">
            <h1>Bills</h1>
            <div className='total'>You've spent ${totalAmount}</div>
            <Search handleSearch={setSearchAddress}/>
            <div className='title'>
                <span className='dateTitle'>Date<button onClick={ascendingDateSort}><img src={upIcon} className="upIcon" alt="up" /></button><button className='downBtn' onClick={descendingDateSort}><img src={downIcon} className="downIcon" alt="down"/></button></span>
                <span>Address</span>
                <span><div>Category
                    <select onChange={(e)=>setFilter(e.target.value)}>
                        <option  value = 'All'>All</option>
                        <option  value = 'Food'>Food</option>
                        <option  value = 'Transportation'> Transportation</option>
                        <option  value = 'Rent-and-Utility'>Rent and Utility</option>
                        <option  value = 'Entertainment'>Entertainment</option>
                        <option  value = 'Other'>Other</option>
                    </select>
                    </div></span>
                <span>Amount($)<button onClick={descendingAmountSort}><img src={upIcon} className="upIcon" alt="up"/></button><button onClick={ascendingAmountSort}><img src={downIcon} className="downIcon" alt="down"/></button></span>
                <span>Description</span>
            </div>
            {Object.keys(billRecordings).length === 0 ? <p className='nothing'>No related bill</p>:<p></p>}
            <ul>{billRecordings}</ul>
        </div>
    );
}

export default BillList;
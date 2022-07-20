import { useContext } from "react";
import ListContext from "./ListContext";

function Bill({bill}){
    const {handleDeleteBill, handleUpdateBill} = useContext(ListContext);
    return(
        <li key={bill.id}>
            <span>{bill.date}</span>
            <span>{bill.address}</span>
            <span>
                <select name="category" id="category-select" value={bill.category} onChange={(e) => handleUpdateBill(bill.id, bill.date, bill.address, e.target.value)}>
                    <option value="Food">Food</option>
                    <option vlaue="Transportation">Transportation</option>
                    <option value="Rent-and-Utility">Rent and Utility</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
            </span>
            <span>{bill.amount}</span>
            {bill.description && <p className="description">{bill.description}</p>}
            <div>
                <button id="deleteBtn" onClick={()=>handleDeleteBill(bill.id, bill.date, bill.address)}>×</button>
            </div>
        </li>
    );
}

export default Bill;
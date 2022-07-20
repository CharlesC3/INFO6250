const uuid = require('uuid').v4;

function makeBillList(){
    const billList = {};

    const bills = {
        ['example1'] : {
            id:'example1',
            date: '01/01/2019',
            address:'Disneyland',
            category:'Entertainment',
            amount:'127.93',
            description:'with friend Joe',
        },
        ['example2'] : {
            id:'example2',
            date: '01/05/2019',
            address:'NEU',
            category:'Other',
            amount:'2000.00',
            description:'invest for future',
        },
        ['example3'] : {
            id:'example3',
            date: '03/01/2019',
            address:'Costco',
            category:'Food',
            amount:'15.49',
            description:'yummy cookies',
        },
        ['example4'] : {
            id:'example4',
            date: '04/10/2019',
            address:'Uber',
            category:'Transportation',
            amount:'60.78',
            description:'to the airport',
        },
        ['example5'] : {
            id:'example5',
            date: '05/20/2019',
            address:'Chipotle',
            category:'Food',
            amount:'9.9',
            description:'enjoy lunch',
        },
        ['example6'] : {
            id:'example6',
            date: '05/24/2019',
            address:'Seattle City Light',
            category:'Rent-and-Utility',
            amount:'60.56',
            description:'Electricity bill',
        },
        ['example7'] : {
            id:'example7',
            date: '06/01/2019',
            address:'Amazon',
            category:'Entertainment',
            amount:'299',
            description:'Nintendo Switch',
        },
    };

    billList.contains = function contains(id){
        return !!bills[id];
    };
    
    billList.getBills = function getBills(){
        return bills;
    };

    billList.addBill = function addBill(newBill){
        const id = uuid();
        bills[id] = {
            id,
            date: newBill.date,
            address: newBill.address,
            category: newBill.category,
            amount: newBill.amount,
            description: newBill.description,
        };
        return id;
    };

    billList.getBill = function getBill(id){
        return bills[id];
    };

    billList.updateBill = function updateBill(id, bill){
        bills[id].category = bill.category;
    };

    billList.deleteBill = function deleteBill(id){
        delete bills[id];
    };

    return billList;
};

module.exports = {
    makeBillList,
};
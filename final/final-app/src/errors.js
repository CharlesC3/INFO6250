export function getErrorMessage({ type, address, date }) {
    let action;
    switch(type) {
        case 'login':
            action = 'logging in';
            break;
        case 'logout':
            action = 'logging out';
            break;
        case 'addBill':
            action = 'adding';
            break;
        case 'updateBill':
            action = 'updating';
            break;
        case 'deleteBill':
            action = 'deleting';
            break;
        case 'retrieveSession':
            action = 'retrieving your login status';
            break;
        case 'retrieveBills':
            action = 'retrieving your saved bills';
            break;
        default:
            action = '';    
    }
    return formatErrorMessage(action, address, date);
}

function formatErrorMessage(action, address, date) {
    if (!action) {
        return `Please try again.`;
    } else if (!address && !date) {
        return `Unexpected error while ${action}. Please try again.`;
    } else {
        return `Unexpected error while ${action} at '${address}' on '${date}'. Please try again.`;
    }
}


export function getInputError(address, amount, date) {
    if (!date || !address || !amount) {
        return 'Required fields cannot be empty.';
    }
    if (!validateDate(date)) {
        return `Please make the 'Date' input to be valid and in the mm/dd/yyyy format.`;
    }
    if (amount && !validateMoney(amount)) {
        return 'Please enter a valid number.';
    }
    return '';
}

function validateMoney(moneyAmount) {
    const amountRegEx = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/;
    return amountRegEx.test(moneyAmount);
}

function validateDate(date) {
    const dateRegEx = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/2\d{3}$/;
    return dateRegEx.test(date);
}
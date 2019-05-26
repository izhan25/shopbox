import { ADD_CUSTOMER, REMOVE_CUSTOMER, UPDATE_CUSTOMER } from '../actions/types';
import { secret_CrptoJS } from '../keys.json';
import CryptoJS from 'crypto-js';

// getting state from Lcal storage if exist
let customer = null;

if (window.localStorage.getItem('customer')) {

    try {
        const encrypted_customer = window.localStorage.getItem('customer');
        const bytes = CryptoJS.AES.decrypt(encrypted_customer, secret_CrptoJS);
        customer = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    catch (error) {
        console.log(error.message);
        customer = JSON.parse(window.localStorage.getItem('customer'));
    }

    // customer = JSON.parse(window.localStorage.getItem('customer'));
}

const initalStage = {
    customer
}

// setting customer to local storage
function setCustomerToLS(state) {
    const { customer } = state;

    if (!customer) {
        // if user logs out
        window.localStorage.setItem('customer', customer);
        return true;
    }

    const encrypted_customer = CryptoJS.AES.encrypt(JSON.stringify(customer), secret_CrptoJS);
    window.localStorage.setItem('customer', encrypted_customer);

    // window.localStorage.setItem('customer', JSON.stringify(customer));
}

export default function (state = initalStage, action) {
    switch (action.type) {
        case ADD_CUSTOMER:
            const newState = {
                ...state,
                customer: action.customer
            }
            setCustomerToLS(newState);
            return newState;


        case REMOVE_CUSTOMER:
            const emptyState = {
                ...state,
                customer: null
            }
            setCustomerToLS(emptyState);
            return emptyState;

        case UPDATE_CUSTOMER:
            const updState = {
                ...state,
                customer: action.customer
            }
            setCustomerToLS(updState);
            return updState;

        default:
            return state;
    }
}
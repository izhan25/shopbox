import { ADD_CUSTOMER, REMOVE_CUSTOMER, UPDATE_CUSTOMER } from '../actions/types';

// getting state from Lcal storage if exist
const customer = window.localStorage.getItem('customer') ? JSON.parse(window.localStorage.getItem('customer')) : null;

const initalStage = {
    customer
}

// setting customer to local storage
function setCustomerToLS(state) {
    const { customer } = state;
    window.localStorage.setItem('customer', JSON.stringify(customer));
}

export default function (state = initalStage, action) {
    console.log(action.type);
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
            console.log(action.customer);
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
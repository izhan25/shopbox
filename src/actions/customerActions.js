import { ADD_CUSTOMER, REMOVE_CUSTOMER, UPDATE_CUSTOMER } from './types';

export const addCustomer = customer => {
    return {
        type: ADD_CUSTOMER,
        customer
    }
}

export const removeCustomer = () => {
    return {
        type: REMOVE_CUSTOMER
    }
}

export const updateCustomer = customer => {
    return {
        type: UPDATE_CUSTOMER,
        customer
    }
}
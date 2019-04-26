import { ADD_CUSTOMER, REMOVE_CUSTOMER, UPDATE_CUSTOMER } from './types';
import firebase from 'firebase';

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
        customer,
    }
}

export const Firebase_EmailValidator = (email, callback) => {
    const db = firebase.firestore();

    db.collection('customers')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                // if email exist
                callback(true);
            }
            else {
                // if email is unique
                callback(false);
            }
        });
}
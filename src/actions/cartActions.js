import { ADD_ITEM, UPDATE_ITEM } from './types';

export const addItem = (product) => {
    return {
        type: ADD_ITEM,
        product
    }
}

export const updateItem = (product) => {
    return {
        type: UPDATE_ITEM,
        product
    }
}
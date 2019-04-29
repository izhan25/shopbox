import { ADD_ITEM, CLEAR_CART, DEC_QTY, SET_LOGIN_ERROR } from './types';

export const addItem = (product) => {
    return {
        type: ADD_ITEM,
        product
    }
}
export const clearCart = () => {
    return {
        type: CLEAR_CART,
    }
}
export const decreaseQty = (product) => {
    return {
        type: DEC_QTY,
        product
    }
}

export const setLoginErrorMsg = (error, msg) => {
    return {
        type: SET_LOGIN_ERROR,
        msg,
        error
    }
}


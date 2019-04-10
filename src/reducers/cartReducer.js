import { ADD_ITEM, UPDATE_ITEM } from '../actions/types';

const initialState = {
    products: [],
    total: 0,
}

export default function (state = initialState, action) {

    const products = state.products;

    switch (action.type) {
        case ADD_ITEM:
            products.push(action.product);

            return {
                ...state,
                products,
                total: state.total + action.product.discountPrice
            }


        case UPDATE_ITEM:
            const updProducts = products.map(prod => prod.id === action.product.id ? action.product : prod);

            return {
                ...state,
                products: updProducts,
                total: state.total + action.product.discountPrice
            }


        default:
            return state;
    }
}
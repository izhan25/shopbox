import { ADD_ITEM, CLEAR_CART, DEC_QTY, SET_LOGIN_ERROR } from '../actions/types';

const products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
const total = window.localStorage.getItem('total') ? JSON.parse(window.localStorage.getItem('total')) : 0;
const quantity = window.localStorage.getItem('quantity') ? JSON.parse(window.localStorage.getItem('quantity')) : 0;

let initialState = {
    products,
    total,
    quantity,
    deliveryCharges: 250,
    loginError: {
        error: false,
        msg: '',
    }
}

function setCartToLS(state) {
    const { products, total, quantity } = state;
    window.localStorage.setItem('products', JSON.stringify(products));
    window.localStorage.setItem('total', JSON.stringify(total));
    window.localStorage.setItem('quantity', JSON.stringify(quantity));
}

export default function (state = initialState, action) {

    const products = state.products;

    switch (action.type) {
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: {
                    error: action.error,
                    msg: action.msg,
                }
            }
        case ADD_ITEM:
            const productsHasItem = products.find(prod => prod.id === action.product.id);

            if (productsHasItem) {
                const updatedProducts = products.map(
                    prod =>
                        prod.id === action.product.id
                            ? (
                                {
                                    ...prod,
                                    totalPrice: parseInt(prod.totalPrice.toString(), 10) + parseInt(action.product.totalPrice.toString(), 10),
                                    qty: prod.qty + action.product.qty
                                }
                            )
                            : prod
                );
                const newState = {
                    ...state,
                    products: updatedProducts,
                    total: parseInt(state.total.toString(), 10) + parseInt(action.product.totalPrice.toString(), 10),
                    quantity: state.quantity + action.product.qty
                }
                setCartToLS(newState);
                return newState;
            }

            products.push(action.product);

            const newState = {
                ...state,
                products,
                total: parseInt(state.total.toString(), 10) + parseInt(action.product.totalPrice.toString(), 10),
                quantity: state.quantity + action.product.qty
            }

            setCartToLS(newState);
            return newState;

        case DEC_QTY:
            const ItemToDecrease = products.find(prod => prod.id === action.product.id);
            if (ItemToDecrease) {

                const updatedProducts = products.map(
                    prod =>
                        prod.id === action.product.id
                            ? (
                                {
                                    ...prod,
                                    totalPrice: parseInt(prod.totalPrice.toString(), 10) - parseInt(prod.discountPrice.toString(), 10),
                                    qty: prod.qty - 1
                                }
                            )
                            : prod
                );
                const newState = {
                    ...state,
                    products: updatedProducts,
                    total: parseInt(state.total.toString(), 10) - parseInt(action.product.decrementAmount.toString(), 10),
                    quantity: state.quantity - 1
                }
                setCartToLS(newState);
                return newState;
            }


            return state;


        case CLEAR_CART:
            const emptyState = {
                ...state,
                products: [],
                total: 0,
                quantity: 0
            }
            setCartToLS(emptyState);
            return emptyState;


        default:
            return state;
    }
}
import { ADD_ITEM, CLEAR_CART, DEC_QTY } from '../actions/types';

const products = window.localStorage.getItem('products') ? JSON.parse(window.localStorage.getItem('products')) : [];
const total = window.localStorage.getItem('total') ? JSON.parse(window.localStorage.getItem('total')) : 0;
const quantity = window.localStorage.getItem('quantity') ? JSON.parse(window.localStorage.getItem('quantity')) : 0;

let initialState = {
    products,
    total,
    quantity
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
        case ADD_ITEM:
            const productsHasItem = products.find(prod => prod.id === action.product.id);

            if (productsHasItem) {
                const updatedProducts = products.map(
                    prod =>
                        prod.id === action.product.id
                            ? (
                                {
                                    ...prod,
                                    totalPrice: prod.totalPrice + action.product.totalPrice,
                                    qty: prod.qty + action.product.qty
                                }
                            )
                            : prod
                );
                const newState = {
                    ...state,
                    products: updatedProducts,
                    total: state.total + action.product.totalPrice,
                    quantity: state.quantity + action.product.qty
                }
                setCartToLS(newState);
                return newState;
            }

            products.push(action.product);

            const newState = {
                ...state,
                products,
                total: state.total + action.product.totalPrice,
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
                                    totalPrice: prod.totalPrice - prod.discountPrice,
                                    qty: prod.qty - 1
                                }
                            )
                            : prod
                );
                const newState = {
                    ...state,
                    products: updatedProducts,
                    total: state.total - action.product.decrementAmount,
                    quantity: state.quantity - 1
                }
                setCartToLS(newState);
                return newState;
            }


            return state;


        case CLEAR_CART:
            const emptyState = {
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
import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
// import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';
import { firebase_Keys } from './keys.json';

import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// My Reducers Import Here
import cartReducer from './reducers/cartReducer';
import customerReducer from './reducers/customerReducer';

const firebaseConfig = JSON.parse(JSON.stringify(firebase_Keys));

// react-redux-firebase config
const rrfConfig = {
    // userProfile: 'users',
    userProfile: null,
    useFirestoreForProfile: true
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    // place my reducers here
    cart: cartReducer,
    customer: customerReducer
});

// initial state
const initialState = {};

// Create store with reducers
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
    // with Redux
    store = createStoreWithFirebase(
        rootReducer,
        initialState,
        compose(
            reactReduxFirebase(firebase),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}
else {
    // Simple
    store = createStoreWithFirebase(
        rootReducer,
        initialState,
        reactReduxFirebase(firebase),
    );
}



export default store;

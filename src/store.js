import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import 'firebase/firestore';

// My Reducers Import Here

const firebaseConfig = {
    apiKey: "AIzaSyDuLVK2-TD3zf9o0ni2C6fmMifmaLL_p9I",
    authDomain: "shopbox-35ae7.firebaseapp.com",
    databaseURL: "https://shopbox-35ae7.firebaseio.com",
    projectId: "shopbox-35ae7",
    storageBucket: "shopbox-35ae7.appspot.com",
    messagingSenderId: "486576798153"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
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
});

// initial state
const initialState = {};

// Create store with reducers
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
// const store = createStoreWithFirebase(
//     rootReducer,
//     initialState,
//     reactReduxFirebase(firebase),
// );

export default store;

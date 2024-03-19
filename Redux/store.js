// import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk';

// // // import cartItems from './Reducers/cartItems';
// // const reducers = combineReducers({
// //     // cartItems: cartItems,
// // })
// const placeholderReducer = (state = {}, action) => {
//     // Placeholder reducer doesn't do anything, just returns the state
//     return state;
//   };
  
//   const reducers = combineReducers({
//     placeholder: placeholderReducer, // Add the placeholder reducer
//   });

// const store = createStore(
//     reducers,
//     applyMiddleware(thunk),
// )

// export default store;


import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import cartItems from './Reducers/cartItems';
const reducers = combineReducers({
    cartItems: cartItems,
})

const store = createStore(
    reducers,
    applyMiddleware(thunk),
)

export default store;
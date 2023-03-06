import { combineReducers, applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';
// import { userloginReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { userloginReducer, userRegisterReducer,userDetailsReducer,userUpdateProfileReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userlogin:userloginReducer,
  userRegister:userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  },
  userlogin: { userInfo: userInfoFromStorage },
  // other initial state properties here
};


const middlewares = [thunk];

// const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState
//   enhancers: [composeWithDevTools(applyMiddleware(...middlewares))],
});

export default store;

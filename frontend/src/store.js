import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
  orderCreateReducer, 
  orderDeleteReducer, 
  orderDeliverReducer, 
  orderDetailesReducer, 
  orderListReducer, 
  orderMineListReducer, 
  orderPayReducer 
} from './reducers/orderReducers';

import { 
  productCategoriesListReducer,
  productCreateReducer, 
  productDeleteReducer, 
  productDetailsReducer, 
  productListReducer, 
  productUpdateReducer 
} from './reducers/productReducers';

import { 
  userRegisterReducer, 
  userSigninReducer, 
  userDetailsReducer, 
  userUpdateProfileReducer, 
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from './reducers/userReducers';

const initialState = {
  userSignin:{
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  },
  cart:{
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingAddress: localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
    paymentMethod: 'PayPal',
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productCategoryList: productCategoriesListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailesReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer,
    productDetailsReducer ,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer' 
import {
    userLoginReducer ,
     userRegisterReducer, 
     userDetailsReducer ,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import { 
    orderCreateReducer ,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
} from './reducers/orderReducers' 

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
})

const cartItemFromLocalStorage=localStorage.getItem('cartItems')
 ? JSON.parse(localStorage.getItem('cartItems'))
 : []

 const userInfoFromLocalStorage=localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo'))
 : null

 const shippingAddressFromLocalStorage=localStorage.getItem('shippingAddress')
 ? JSON.parse(localStorage.getItem('shippingAddress'))
 : {}

const initialState={
    cart:{
        cartItems:cartItemFromLocalStorage,
        shippingAddress:shippingAddressFromLocalStorage,
    },
    userLogin:{userInfo:userInfoFromLocalStorage},
}

const middleware=[thunk]

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
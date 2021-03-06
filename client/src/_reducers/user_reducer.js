import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    UPDATE_PROFILE,
    CHANGE_USER_INFO
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload //userInfo.cart
                }
            }
        case GET_CART_ITEMS:
            return {
                ...state,
                cartDetail: action.payload
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartDetail: action.payload.productInfo,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case ON_SUCCESS_BUY:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData:{
                    ...state.userData, cart: action.payload.cart
                }
            }
        case UPDATE_PROFILE:
            console.log('CALL REDUCE UPDATE_PROFILE');
            return {
                ...state,
                userData: {
                    ...state.userData,
                    nickName: action.payload.nickName,
                    profileImage: action.payload.profileImage
                }
            }
        case CHANGE_USER_INFO:
            console.log('CALL REDUCE CHANGE_USER_INFO');
            return {
                ...state,
                userData: {
                    ...state.userData,
                    name: action.payload.name,
                    email: action.payload.email,
                    phone: action.payload.phone,
                }
            }
        default:
            return state;
    }
}
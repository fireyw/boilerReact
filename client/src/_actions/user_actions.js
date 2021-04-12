import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    UPDATE_PROFILE
} from './types';
import {USER_SERVER} from '../components/Config.js';

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id) {

    let body = {
        productId: id
    }
    const request = axios.post(`${USER_SERVER}/addToCart`, body)
        .then(response => response.data);  //redux cartDetail과 동일한정보들이 들어있다

    return {
        type: ADD_TO_CART,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {

    // axios.get(`/api/product/products_by_id?id=${productId}&type=single`)

    const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
        .then(response => {
            //cart item정보는 product 정보를 가져온 후 quantity를 넣어준다. (quantity는 user에 있음)
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}

export function removeCartItem(productId) {
    const request = axios.get(`${USER_SERVER}/removeFromCart?id=${productId}`)
        .then(response => {
            //productInfo와 cart 정보를 조합해서 cartDetail을 만듬
            //카트에 있는 상품정보를 가지고 와서 카트에 담긴 개수를 상품정보에 추가할 예정
            response.data.cart.forEach(item => {

                response.data.productInfo.forEach((product, index) => {
                    if (product._id === item.id) {
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
            return response.data;
        });
    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => {
            return response.data;
        })

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}

export function updateProfile(data) {

    console.log('user_action updateProfile api call formData: ', data);
    const request = axios.post('/api/users/updateProfile', data)
        .then(response=>{
            // if(response.data.success){
            //     setProfileImage(response.data.filePath);
            //     console.log('프로필 사진 저장 성공');
            // }else{
            //     alert('파일 저장 실패');
            // }
            console.log("user_action updateProfile response.data: " , response.data);
            return response.data;
        });

    return {
        type: UPDATE_PROFILE,
        payload: request
    }
}


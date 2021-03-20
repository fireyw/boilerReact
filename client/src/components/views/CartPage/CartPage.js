import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getCartItems} from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";

function CartPage(props) {
    const dispatch= useDispatch();
    useEffect(()=>{

        let cartItems=[];

        //리덕스 user state에 cart안에 상품이 있는지 확인
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length>0){
                props.user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                })

                //axios로 조회할 필요 없이 redux에서 가져온다
                dispatch(getCartItems(cartItems, props.user.userData.cart));

            }
        }

    },[props.user.userData]);

    return (
        <div style-={{width:'85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>

            <div>
                {/*데이터를 불러오기 전에 dom이 그려저 error발생하여 && 조건 추가*/}
                <UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}/>
            </div>
        </div>
    );
}

export default CartPage;
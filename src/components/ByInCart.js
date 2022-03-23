import React from 'react';
//import { store } from '../redux/Store';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ByInCart = (props) => {
    const productitem = props.productitem;
    const dispatch = useDispatch();

    console.log(props.productitem)

    const ACTION_ADD_PRODUCT = 'actionAddProduct'
    const actionAddProduct = {
        type: ACTION_ADD_PRODUCT,
        payload: productitem
    }

    const ACTION_DEL_PRODUCT = 'actionDelProduct'
    const actionDelProduct = {
        type: ACTION_DEL_PRODUCT,
        payload: productitem
    }

    //let basketItems = store.getState()
    //console.log(basketItems)

    // const isFind = function () {
    // //dispatch(actionAddProduct)
    // return basketItems.basket.some(function(el) {
    //     if (el.color === productitem.color) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // });
    // };
    const productInCart = useSelector(state => state.basketReducer.basket)
    const productInCart22 = useSelector(state => state.loadReducer)
    console.log(productInCart22)
    // const productInCart = useSelector(state => state.basket) было без combineReducers
    const isFind = function () {
        
        const isProguctInCart = productInCart.some(product => (
            product.id === productitem.id &&
            product.color === productitem.color &&
            product.size === productitem.size
        ))
        return isProguctInCart
    }
    // console.log(isFind())
    // console.log(isProguctInCart)
    // console.log(productInCart)
    // const productInCart = useSelector(state => state.basket);
    const changeCart = (e) => {
        
        const gaga = isFind()

        if (gaga === false) {
            console.log(productitem)
            dispatch(actionAddProduct)
            //dispatch({ type: 'actionAddProduct', payload: productitem });
        } 
        else {
            dispatch(actionDelProduct)
        }
    }
    return (
        <span>
        
            <button class="add-to-card" onClick={changeCart} data-test-id="add-cart-button">{isFind() === true ? <div>REMOVE TO CARD</div> : <div>ADD TO CARD</div>}</button>
        
        </span>
    )


}
export {ByInCart}
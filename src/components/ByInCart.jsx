import React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ByInCart = (props) => {
    const productitem = props.productitem;
    const dispatch = useDispatch();

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

    const productInCart = useSelector(state => state.basketReducer.basket)
    const isFind = function () {
        const isProguctInCart = productInCart.some(product => (
            product.id === productitem.id &&
            product.color === productitem.color &&
            product.size === productitem.size
        ))
        return isProguctInCart
    }

    const changeCart = (e) => {
        const searchF = isFind()

        if (searchF === false) {
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
import React from 'react';
import { useDispatch } from "react-redux";

const ItemCart = (props) => {
    const product = props.product;
    const dispatch = useDispatch();

    const ACTION_ADD_COUNTER = 'actionAddCounter'
    const actionAddCounter = {
        type: ACTION_ADD_COUNTER,
        payload: product
    }

    const ACTION_DEL_COUNTER = 'actionDelCounter'
    const actionDelCounter = {
        type: ACTION_DEL_COUNTER,
        payload: product
    }

    const ACTION_DEL_PRODUCT = 'actionDelProduct'
    const actionDelProduct = {
        type: ACTION_DEL_PRODUCT,
        payload: product
    }

    function changeCounter (e) {
        e.target.textContent === '+' ? dispatch(actionAddCounter) : dispatch(actionDelCounter);
    }

    function changeBasket () {
        dispatch(actionDelProduct);
    }

    return (
            <>
            <div className="prod-basket" data-test-id="cart-card">
                <div className="prod-basket__img">
                    <img src={"https://training.cleverland.by/shop" + product.url} className="prod-basket__img-prod" alt={product.url} id={product.color} value={product.url}/>
                </div>
                <div className="prod-basket__desc">
                    <div className="prod-basket__info">
                        <span class="prod-basket__info__name">{product.name}</span>
                        <span class="prod-basket__info__size">{product.color}, {product.size}</span>
                    </div>
                <div className="prod-basket__price-info">
                    <div className="prod-basket__counter">
                        <button onClick={changeCounter} data-test-id="minus-product">-</button>
                        <span>{product.counter}</span>
                        <button onClick={changeCounter} data-test-id="plus-product">+</button>
                    </div>
                    <div className="prod-basket__price">
                        $ {product.price}
                    </div>
                    <div className="prod-basket__del" onClick={changeBasket} data-test-id="remove-product">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5H17M16 5L15.133 17.142C15.0971 17.6466 14.8713 18.1188 14.5011 18.4636C14.1309 18.8083 13.6439 19 13.138 19H4.862C4.35614 19 3.86907 18.8083 3.49889 18.4636C3.1287 18.1188 2.90292 17.6466 2.867 17.142L2 5H16ZM7 9V15V9ZM11 9V15V9ZM12 5V2C12 1.73478 11.8946 1.48043 11.7071 1.29289C11.5196 1.10536 11.2652 1 11 1H7C6.73478 1 6.48043 1.10536 6.29289 1.29289C6.10536 1.48043 6 1.73478 6 2V5H12Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                </div>
            </div>
            </>
    )

}
export {ItemCart}
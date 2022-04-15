import React from "react";

const Payment = (props) => {
  const {changeFurtherButton, productInCart, totalPrice, tooggleBasketModeViewCart, tooggleBasketMode, isTypeButtonLoad} = props;
  return (
    <>
    <div className="delivery">
      Оплата
    </div>
    <div className="basket__bottom">
        {
        productInCart.length > 0 ?
        <>
        <div className="basket__bottom__info">
        <span className="basket__bottom__total">Total</span>
        <span className="basket__bottom__price">$ {totalPrice}</span>
        </div>

        <div className="basket__bottom__btns">
        <button
            className="basket__bottom__btn basket__bottom__btn_black"
            // onClick={(e) => changeFurtherButton(e)}
            type="submit"
            form='my-form'
        >
            FURTHER
        </button>
        </div>

        <div className="basket__bottom__btns">
        <button
            className="basket__bottom__btn basket__bottom__btn_white"
            onClick={tooggleBasketModeViewCart}
        >
            VIEW CART
        </button>
        </div>
        </>
        :
        <>
        <div className="basket__bottom__btns">
        <button className="basket__bottom__btn basket__bottom__btn_black" onClick={tooggleBasketMode}>BACK TO SHOPPING</button>
        </div>
        </>
        }      
    </div>
    </>
  )
};

export default Payment;
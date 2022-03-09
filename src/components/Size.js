import React, { useEffect, useState } from 'react';

const Size = (props) => {
    const {product} = props;

    let [btnContent, setBtnContent] = useState({product}.product.sizes[0]);

    useEffect(() => {
        const ite = document.querySelectorAll(".size__btn");
        ite[0].classList.add("size__btn_active");
      }, []);

    function sizeChose(e) {
        const items = document.querySelectorAll(".size__btn");
        const target = e.currentTarget;
        Array.from(items).forEach((item) => {
            item.classList.remove("size__btn_active");
        });
        target.classList.add("size__btn_active");
        setBtnContent((btnContent = e.currentTarget.textContent))
    }
    // console.log(`arr`, {product}.product.sizes)

    return (
        <>
        <div class="size">
            <div class="size__title">
                <span class="color__text">size:</span><span class="color__span">{btnContent}</span>
            </div>
            <ul class="size__image-list flex list-reset">

                {{product}.product.sizes.map((post) => {
                    return (

                        <li className="size__item">
                            <button className='size__btn' onClick={sizeChose}>{post}</button>
                        </li>

                    )
                })}

            </ul>

            <div class="size__guide">
                <button className="size__guide-btn">Size guide</button>
            </div>
        </div>
        </>   
    )
}

export {Size}
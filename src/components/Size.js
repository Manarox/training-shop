import React, { useEffect, useState } from 'react';

const Size = (props) => {
    const {product} = props;

    // let [btnContent, setBtnContent] = useState({product}.product.sizes[0]);

    // useEffect(() => {
    //     const ite = document.querySelectorAll(".size__btn");
    //     ite[0].classList.add("size__btn_active");
    //   }, []);

    // function sizeChose(e) {
    //     const items = document.querySelectorAll(".size__btn");
    //     const target = e.currentTarget;
    //     Array.from(items).forEach((item) => {
    //         item.classList.remove("size__btn_active");
    //     });
    //     target.classList.add("size__btn_active");
    //     setBtnContent((btnContent = e.currentTarget.textContent))
    // }
    // console.log(`arr`, {product}.product.sizes)

    const [sizee, setSize] = useState({product}.product.sizes[0]);
    const changeSize = (e) => {
        setSize(e.target.value);
      };
    let gfgfgf = {product}.product.sizes[0]

    useEffect(() => {
        setSize(gfgfgf);
    }, [gfgfgf]);


    return (
        <>
        <div class="size">
            <div class="size__title">
                <span class="color__text">size:</span><span class="color__span">{sizee}</span>
            </div>
            <ul class="size__image-list flex list-reset">

                {{product}.product.sizes.map((post) => {
                    return (

                        <li className="size__item">
                            <button value={post} className={post === sizee ? 'size__btn size__btn_active' : 'size__btn'} onClick={(e) => changeSize(e)}>{post}</button>
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
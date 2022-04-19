import React, { useEffect, useState } from 'react';

const Size = (props) => {
    const {product} = props;

    console.log({product}.product.sizes[0])

    const [sizee, setSize] = useState({product}.product.sizes[0]);

    const changeSize = (e) => {
        setSize(e.currentTarget.id);
      };
    
    useEffect(() => {
        setSize({product}.product.sizes[0]);
    }, [product]);


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
                            <button className={post === sizee ? 'size__btn size__btn_active' : 'size__btn'} onClick={(e) => changeSize(e)} id={post}>{post}</button>
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
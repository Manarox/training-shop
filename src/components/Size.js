import React, { useEffect, useState } from 'react';

const Size = (props) => {
    const {product} = props;

    
    console.log({product}.product.id)

    const targetSize = {product}.product.sizes[0]
    let targetId = {product}.product.id
    
    console.log({product}.product)
    const [sizee, setSize] = useState(targetSize);
    console.log({sizee})

    const changeSize = (e) => {
        setSize(e.currentTarget.id);
      };
    
    useEffect(() => {
        setSize(targetSize);
    }, [targetId]);


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
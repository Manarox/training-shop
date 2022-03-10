import React, { useEffect, useState } from 'react';

const Color = (props) => {
    const {color} = props;

    console.log({color}.color)

    let result = {color}.color.reduce((accumulator, currentValue) => {
        if (accumulator.every(item => !(item.color === currentValue.color))) accumulator.push(currentValue);
        return accumulator;
    }, []);

    console.log(result)

    let [btnContent, setBtnContent] = useState(result[0].color);

    // console.log(result[0].color)

    useEffect(() => {
        const ite = document.querySelectorAll(".color__image");
        ite[0].classList.add("color__image_active");
      }, []);

    function colorChose(e) {
        const items = document.querySelectorAll(".color__image");
        const target = e.currentTarget;
        Array.from(items).forEach((item) => {
            item.classList.remove("color__image_active");
        });
        target.classList.add("color__image_active");
        setBtnContent((btnContent = e.currentTarget.id))
    }

    return (
        <>
        <div class="color">
            <div class="color__title">
                <span class="color__text">Color:</span><span class="color__span">{btnContent}</span>
            </div>

            <ul class="color__image-list flex list-reset">

                {result.map((post) => {
                    return (

                    <li class="color__item">
                        <img src={"https://training.cleverland.by/shop" + post.url} className="color__image" alt="Rating product" onClick={colorChose} id={post.color}/>
                    </li>

                    )
                })}

            </ul>

        </div>
        </>   
    )
}

export {Color}
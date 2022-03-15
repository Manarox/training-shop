import React, { useEffect, useState } from 'react';

const Color = (props) => {
    // const {color} = props;
    const {res} = props;

    console.log({res}.res[0].color)

    // let result = {color}.color.reduce((accumulator, currentValue) => {
    //     if (accumulator.every(item => !(item.color === currentValue.color))) accumulator.push(currentValue);
    //     return accumulator;
    // }, []);
    
    // let targetColor = {res}.res[0].color

    const [colorr, setColor] = useState({res}.res[0].color);

    // console.log(result[0].color)

    const changeImage = (e) => {
        setColor(e.currentTarget.id);
    };

    useEffect(() => {
        setColor({res}.res[0].color);
    }, [res]);


    return (
        <>
        <div class="color">
            <div class="color__title">
                <span class="color__text">Color:</span><span class="color__span">{colorr}</span>
            </div>

            <ul class="color__image-list flex list-reset">

                {{res}.res.map((post) => {
                    return (

                    <li class="color__item">
                        <img src={"https://training.cleverland.by/shop" + post.url} className={colorr === post.color ? 'color__image color__image_active' : 'color__image'} alt="Rating product" onClick={(e) => changeImage(e)} id={post.color}/>
                    </li>

                    )
                })}

            </ul>

        </div>
        </>   
    )
}

export {Color}
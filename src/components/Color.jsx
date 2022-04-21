import React, { useEffect, useState } from 'react';

export const Color = (props) => {
    const {res} = props;

    const [colorr, setColor] = useState({res}.res[0].color);
    const [colorr_url, setColorUrl] = useState({res}.res[0].url);

    console.log({res}.res[0].color)

    const changeImage = (e) => {
        setColor(e.currentTarget.id);
        setColorUrl(e.currentTarget.alt);
    };

    useEffect(() => {
        setColor({res}.res[0].color);
        setColorUrl({res}.res[0].url);
    }, [res]);

    let arrColorUrl = []
    arrColorUrl.color = {colorr}.colorr
    arrColorUrl.url = {colorr_url}.colorr_url

    console.log({res}.res)

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
                        <img src={"https://training.cleverland.by/shop" + post.url} className={colorr === post.color ? 'color__image color__image_active' : 'color__image'} alt={post.url} onClick={(e) => changeImage(e)} id={post.color} value={post.url}/>
                    </li>

                    )
                })}

            </ul>

        </div>
        </>   
    )
}
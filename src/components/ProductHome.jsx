import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';

export const ProductHome = (props) => {
    const {post} = props;

    return (
        <>
            <li className="product__item" data-test-id={`clothes-card-${{post}.post.category}`}>
                <Link to={`/${{post}.post.category}/${post.id}`}>
                    <div className="product__img-block">
                        <img src={"https://training.cleverland.by/shop" + post.images[0]?.url} alt="Product name" class="product__img" />
                        <div className="product__discount">
                            {post.discount}
                        </div>
                    </div>
                    <div className="product__about flex">
                        <div className="product__name">
                            {post.name}
                        </div>
                        <div className="product__info flex">
                            <div className="product__cost flex">
                                <div className="product__price">
                                    {post.price} $
                                </div>
                                <div className="product__old-price">
                                    {post.oldprice}
                                </div>
                            </div>
                            <Rating rating={post.rating}/>
                        </div>
                    </div>
                </Link>
            </li>
        </>   
    )
}
import React from 'react';
import { Link } from "react-router-dom";
// import Data from "./data.json";
import { PRODUCTS } from "../components/products.js";
import { Rating } from '../components/Rating';
import '../components/ProductList.css';

const CategoryHome = (props) => {
    const {category} = props;
    const arr = [];

    if ({category}.category === 'women') {
        PRODUCTS.women.map(post => {
            return (
                arr.push(post)
            )
        })
    } else if ({category}.category === 'men') {
        PRODUCTS.men.map(post => {
            return (
                arr.push(post)
            )
        })
    } 
    return (
        <>
        <div className='clothes' data-test-id={`clothes-${category}`}>
        <ul class="product__list flex list-reset">
            {arr.map(post => {
                return (
                    <li class="product__item" data-test-id={`clothes-card-${category}`}>
                        <Link to={`/${category}/${post.id}`}>
                        <div class="product__img-block">
                            <img src={"https://training.cleverland.by/shop" + post.images[0]?.url} alt="Product name" class="product__img" />
                            <div className="product__discount">
                                {post.discount}
                            </div>
                        </div>
                        <div class="product__about flex">
                            <div class="product__name">
                                {post.name}
                            </div>
                            <div class="product__info flex">
                                <div class="product__cost flex">
                                    <div class="product__price">
                                        {post.price} $
                                    </div>
                                    <div class="product__old-price">
                                        {post.oldprice}
                                    </div>
                                </div>
                                <Rating rating={post.rating}/>
                            </div>
                        </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
        </div>
        </>
        
    )
}

export {CategoryHome}
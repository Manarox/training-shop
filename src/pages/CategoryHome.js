import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import Data from "./data.json";
import { PRODUCTS } from "../components/products.js";
import { main_clothes_block_menu } from "../components/Buttons.js";
import { ProductHome } from '../components/ProductHome';
import '../components/ProductList.css';

const CategoryHome = (props) => {
    const {category} = props;
    const arr = [];
    // let particulars = '';
    
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

    const [particulars, setParticulars] = useState('isNewArrivals');

    const changeButtons = (elem) => {
        setParticulars(elem.target.value);
    }
    
    return (
    <>

        <div className="product__nav flex">
            <h2 className="product__h2">
                {category}
            </h2>
            <ul className="product__nav-list flex list-reset">

                {main_clothes_block_menu.map(({particulars, name}) => (
                    <li className="product__nav-item product__nav-item_active">
                        <button
                        type="button"
                        className="product__link"
                        key={particulars}
                        onClick={changeButtons}
                        value={particulars}
                        data-test-id={`clothes-${category}-${particulars}`}
                        >
                            {name}
                        </button>
                    </li>    
                ))}

            </ul>
        </div>

        <div className='clothes' data-test-id={`clothes-${category}`}>
        <ul class="product__list flex list-reset">

            {arr.map(post => (
                post.particulars[particulars] === true ? <ProductHome post={post} key={post.id}/> : null
            ))}    

        </ul>
        </div>

        <Link to="/" className="see-all flex see-all__link">
            See All
        </Link>
    </>
    )
}

export {CategoryHome}
import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import Data from "./data.json";
//import { PRODUCTS } from "../components/products.js";
import { main_clothes_block_menu } from "../components/Buttons.js";
import { ProductHome } from '../components/ProductHome';
import '../components/ProductList.css';
import { useSelector } from "react-redux";

const CategoryHome = (props) => {
    const {category} = props;
    const arr = [];
    let categor = ''
    // let particulars = '';

    //console.log(PRODUCTS)
    
    const productsLoad = useSelector(state => state.loadReducer.products)
    //console.log(productsLoad)

    let i = 0;
    if ({category}.category === 'women') {
        productsLoad.women.map(post => {
            categor = 'women'
            return (
                arr.push(post)
            )
        })
    } else if ({category}.category === 'men') {
        productsLoad.men.map(post => {
            categor = 'men'
            return (
                arr.push(post)
            )
        })
    }

    const [particulars, setParticulars] = useState('isNewArrivals');

    const changeButtons = (elem) => {
        setParticulars(elem.target.value);
        if (categor === 'women') {
            const items = document.querySelectorAll(".product__link_women");
            const target = elem.currentTarget;
            Array.from(items).forEach((item) => {
                item.classList.remove("product__link_active");
            });
            target.classList.add("product__link_active");
        }
        if (categor === 'men') {
            const items = document.querySelectorAll(".product__link_men");
            const target = elem.currentTarget;
            Array.from(items).forEach((item) => {
                item.classList.remove("product__link_active");
            });
            target.classList.add("product__link_active");
        }
    }
    return (
    <>

        <div className="product__nav flex">
            <h2 className="product__h2">
                {category}
            </h2>
            <ul className="product__nav-list flex list-reset">

                {main_clothes_block_menu.map(({particulars, name}) => {
                    i++;
                    return (
                    
                    <li className="product__nav-item">
                        <button
                        type="button"
                        className={`product__link product__link_${categor}` + (i === 1 ? ' product__link_active' : '')}
                        key={particulars}
                        onClick={changeButtons}
                        value={particulars}
                        data-test-id={`clothes-${category}-${particulars}`}
                        >
                            {name}
                        </button>
                    </li>
                    )

                })}

            </ul>
        </div>

        <div className='clothes' data-test-id={`clothes-${category}`}>
        <ul class="product__list flex list-reset">

            {arr.map(post => (
                post.particulars[particulars] === true ? <ProductHome post={post} key={post.id}/> : null
            ))}    

        </ul>
        </div>

        <Link to={`${category}`} className="see-all flex see-all__link">
            See All
        </Link>
    </>
    )
}

export {CategoryHome}
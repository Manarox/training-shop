import React from 'react';
import { useState } from "react";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import Data from "./data.json";
//import { PRODUCTS } from "../components/products.js";
import { ProductHome } from '../components/ProductHome';
import classNames from 'classnames';
import '../components/ProductList.css';
import { useSelector } from "react-redux";
import Loading from '../components/Loading';

const Category = (props) => {
    const {category} = useParams();
    const arr = [];
    let colorResult = [];
    // let colorFilterResult = [];
    let sizeResult = [];
    let brandResult = [];

    //console.log(PRODUCTS)
    const productsLoad = useSelector(state => state.loadReducer.products)
    console.log(productsLoad)

    if ({category}.category === 'women') {
        productsLoad.women.map(post => {
            return (
                arr.push(post)
            )
        })
    } else if ({category}.category === 'men') {
        productsLoad.men.map(post => {
            return (
                arr.push(post)
            )
        })
    } 

    console.log({category})




    const [isFilterOpen, toggleFilter] = useState(false);

     function tooggleFilterMode() {
        toggleFilter(!isFilterOpen);
    }

    /*Поиск всех уникальных цветов*/

    arr.map(post => (
        post.images.map(post => (
            colorResult.push(post.color)
        ))
    ))
    colorResult = Array.from(new Set(colorResult));

    /*Поиск всех уникальных размеров*/

    arr.map(post => (
        post.sizes.map(post => (
            sizeResult.push(post)
        ))
    ))
    sizeResult = Array.from(new Set(sizeResult));

    /*Поиск всех уникальных брендов*/

    // console.log(arr)
    arr.map(post => (
        brandResult.push(post.brand)
    ))
    brandResult = Array.from(new Set(brandResult));

    /*useState для фильтра Color*/
    const [useColor, setUseColor] = useState([]);

    let selectedColor = (elem) => {
        let colorFilterResult = [...useColor]
        const target = elem.currentTarget;
        if (target.checked) {
            colorFilterResult.push(elem.target.value)
        } else {
            colorFilterResult = colorFilterResult.filter(function(item) { 
                return item !== elem.target.value
            })
        }
        const items = document.getElementById('filter__chose_color');
        items.innerText = ""
        for (let i = 0; i < colorFilterResult.length; i++) {
            items.innerText += '   Color: ' + colorFilterResult[i]
        }
        
        if (colorFilterResult.length === 0) {
            items.innerText = ""
        }
        return (
            setUseColor(colorFilterResult)
        )
    }

    // console.log({useColor})

    /*useState для фильтра Size*/
    const [useSize, setUseSize] = useState([]);

    let selectedSize = (elem) => {
        let sizeFilterResult = [...useSize]
        const target = elem.currentTarget;
        if (target.checked) {
            sizeFilterResult.push(elem.target.value)
        } else {
            sizeFilterResult = sizeFilterResult.filter(function(item) { 
                return item !== elem.target.value
            })
        }
        const items = document.getElementById('filter__chose_size');
        items.innerText = ""
        for (let i = 0; i < sizeFilterResult.length; i++) {
            items.innerText += '   Size: ' + sizeFilterResult[i]
        }
        if (sizeFilterResult.length === 0) {
            items.innerText = ""
        }
        return (
            setUseSize(sizeFilterResult)
        )
    }

    // console.log({useSize})

    /*useState для фильтра Brand*/
    const [useBrand, setUseBrand] = useState([]);

    let selectedBrand = (elem) => {
        let brandFilterResult = [...useBrand]
        const target = elem.currentTarget;
        if (target.checked) {
            brandFilterResult.push(elem.target.value)
        } else {
            brandFilterResult = brandFilterResult.filter(function(item) { 
                return item !== elem.target.value
            })
        }
        const items = document.getElementById('filter__chose_brand');
        items.innerText = ""
 
        for (let i = 0; i < brandFilterResult.length; i++) {
            items.innerText += '   Brand: ' + brandFilterResult[i]
        }

        if (brandFilterResult.length === 0) {
            items.innerText = ""
        }
        return (
            setUseBrand(brandFilterResult)
        )
    }

    // console.log({useBrand})

    /*useState для фильтра Price*/
    const [usePrice, setUsePrice] = useState([]);

    let selectedPrice = (elem) => {
        let priceFilterResult = [...usePrice]
        const target = elem.currentTarget;
        if (target.checked) {
            priceFilterResult.push(elem.target.value)
        } else {
            priceFilterResult = priceFilterResult.filter(function(item) { 
                return item !== elem.target.value
            })
        }
        const items = document.getElementById('filter__chose_price');
        items.innerText = ""
        for (let i = 0; i < priceFilterResult.length; i++) {
            items.innerText += '   Price: ' + priceFilterResult[i]
        }
        if (priceFilterResult.length === 0) {
            items.innerText = ""
        }

        return (
            setUsePrice(priceFilterResult)
        )
    }

   

    // console.log({usePrice})

    let filterArr = []
    filterArr.push({useColor})
    filterArr.push({useSize})
    filterArr.push({useBrand})
    filterArr.push({usePrice})
    // console.log(filterArr)
    // console.log(arr)

    function poiskBrand(post) {

            // console.log(filterArr[2].useBrand)
            for (var i = 0; i < filterArr[2].useBrand.length; i++) {
                if (filterArr[2].useBrand[i] === post.post.brand) {
                    return true;
                }
            }

        return false;
    }

    function poiskColor(post) {
        // console.log(filterArr[0].useColor)
        // console.log(post.post.images)
        for (var i = 0; i < post.post.images.length; i++) {
            for (var j = 0; j < filterArr[0].useColor.length; j++) {
                if (post.post.images[i].color === filterArr[0].useColor[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    function poiskSize(post) {
        for (var i = 0; i < post.post.sizes.length; i++) {
            for (var j = 0; j < filterArr[1].useSize.length; j++) {
                if (post.post.sizes[i] === filterArr[1].useSize[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    
    function poiskPrice(post) {
        for (var i = 0; i < filterArr[3].usePrice.length; i++) {
            if (filterArr[3].usePrice[i] === "500+") {
                if (post.post.price >= 500) {
                    return true;
                }
            } else if (filterArr[3].usePrice[i] === "200-500") {
                if ((post.post.price >= 200) && (post.post.price <= 500)) {
                    return true;
                }
            } else if (filterArr[3].usePrice[i] === "100-200") {
                if ((post.post.price >= 100) && (post.post.price <= 200)) {
                    return true;
                }
            } else if (filterArr[3].usePrice[i] === "50-100") {
                if ((post.post.price >= 50) && (post.post.price <= 100)) {
                    return true;
                }
            } else if (filterArr[3].usePrice[i] === "0-50") {
                if ((post.post.price >= 0) && (post.post.price <= 50)) {
                    return true;
                }
            } 
        }
        return false;
    }

    function renderAll() {
        if ((filterArr[0].useColor.length === 0) && (filterArr[1].useSize.length === 0) && (filterArr[2].useBrand.length === 0) && (filterArr[3].usePrice.length === 0)) {
            return true;
        }
    }

    let countProd = [0]
    
    function Rezultat(post) {
        if ((filterArr[0].useColor.length > 0) && (poiskColor(post) === false)) {
            return false
        } else if ((filterArr[1].useSize.length > 0) && (poiskSize(post) === false)) {
            return false
        } else if ((filterArr[2].useBrand.length > 0) && (poiskBrand(post) === false)) {
            return false
        } else if ((filterArr[3].usePrice.length > 0) && (poiskPrice(post) === false)) {
            return false
        }
    
        if ((filterArr[0].useColor.length > 0) && (poiskColor(post) === true)) {
            countProd[0] = countProd[0]+1;
            //const items = document.querySelector(".filter__chose_count");
            //items.classList.add("filter__chose_count_active");
            // const items = document.getElementById('filter__chose_count');
            
            // // items.innerText = ""
            // // items.innerText = countProd[0] + "items Found"
            // console.log(countProd)
            // if (countProd[0] === null) {
            //     console.log(countProd)
            //     items.innerText = ""
            // }
            return true
        } else if ((filterArr[1].useSize.length > 0) && (poiskSize(post) === true)) {
            countProd[0] = countProd[0]+1;
            // const items = document.getElementById('filter__chose_count');
            // items.innerText = ""
            // items.innerText = countProd[0] + "items Found"
            // if (countProd[0] === 0) {
            //     items.innerText = ""
            // }
            return true
        } else if ((filterArr[2].useBrand.length > 0) && (poiskBrand(post) === true)) {
            countProd[0] = countProd[0]+1;
            // const items = document.getElementById('filter__chose_count');
            // items.innerText = ""
            // items.innerText = countProd[0] + "items Found"
            // if (countProd[0] === 0) {
            //     items.innerText = ""
            // }
            return true
        } else if ((filterArr[3].usePrice.length > 0) && (poiskPrice(post) === true)) {
            countProd[0] = countProd[0]+1;
             // const items = document.getElementById('filter__chose_count');
            // items.innerText = ""
            // items.innerText = countProd[0] + "items Found"
            // if (countProd[0] === 0) {
            //     items.innerText = ""
            // }
            return true
        }
    }

    useEffect(() => {
        

        toggleFilter(false);
        setUseColor([]);
        setUseSize([]);
        setUseBrand([]);
        setUsePrice([]);
    }, [category]);

    console.log(countProd)

    const {isLoading} = useSelector((state) => state.loadReducer);
    return (
        
        <>
        <div className='products-page' data-test-id={`products-page-${category}`}>
        <div className="background-grey_f8">
            <section className="bread flex container">
            <div className="bread__wrap">
                <ul className="bread__list flex list-reset">
                <li className="bread__item">
                    <Link to="/" className="bread__href">Home</Link>
                </li>
                <li className="bread__item bread__item_active">
                    <Link to={`/${category}`} className="bread__href">{category}</Link>
                </li>
                </ul>
                <button className="bread__btn">
                Share
                </button>
            </div>
            <div className="bread__title">
                <h1 className="bread__h1">{category}</h1>
            </div>
            </section>
        </div>

        <section className="filter flex container">
            <div className="filter__wrap">
                <div className='filter__choice' onClick={tooggleFilterMode} data-test-id="filter-button">
                    <svg className={classNames('filter__ico1', { filter__ico1_active: isFilterOpen })} width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4.00004V1.33337M12 4.00004C11.2928 4.00004 10.6145 4.28099 10.1144 4.78109C9.61433 5.28119 9.33337 5.95946 9.33337 6.66671C9.33337 7.37395 9.61433 8.05223 10.1144 8.55232C10.6145 9.05242 11.2928 9.33337 12 9.33337M12 4.00004C12.7073 4.00004 13.3856 4.28099 13.8857 4.78109C14.3858 5.28119 14.6667 5.95946 14.6667 6.66671C14.6667 7.37395 14.3858 8.05223 13.8857 8.55232C13.3856 9.05242 12.7073 9.33337 12 9.33337M12 9.33337V22.6667M4.00004 20C4.70728 20 5.38556 19.7191 5.88566 19.219C6.38576 18.7189 6.66671 18.0406 6.66671 17.3334C6.66671 16.6261 6.38576 15.9479 5.88566 15.4478C5.38556 14.9477 4.70728 14.6667 4.00004 14.6667M4.00004 20C3.2928 20 2.61452 19.7191 2.11442 19.219C1.61433 18.7189 1.33337 18.0406 1.33337 17.3334C1.33337 16.6261 1.61433 15.9479 2.11442 15.4478C2.61452 14.9477 3.2928 14.6667 4.00004 14.6667M4.00004 20V22.6667M4.00004 14.6667V1.33337M20 20C20.7073 20 21.3856 19.7191 21.8857 19.219C22.3858 18.7189 22.6667 18.0406 22.6667 17.3334C22.6667 16.6261 22.3858 15.9479 21.8857 15.4478C21.3856 14.9477 20.7073 14.6667 20 14.6667M20 20C19.2928 20 18.6145 19.7191 18.1144 19.219C17.6143 18.7189 17.3334 18.0406 17.3334 17.3334C17.3334 16.6261 17.6143 15.9479 18.1144 15.4478C18.6145 14.9477 19.2928 14.6667 20 14.6667M20 20V22.6667M20 14.6667V1.33337" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg className={classNames('filter__ico22', { filter__ico2_active: isFilterOpen })} width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L17 17M1 17L17 1L1 17Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="filter__text">Filter</span>
                </div>
                <div className="filter__card-form">
                    <ul className="filter__form-list flex list-reset">
                        <li className="filter__form-item">
                        <Link to="/" className="filter__href">
                            <svg className="filter__ico2" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 13H17M1 1H17H1ZM1 5H17H1ZM1 9H17H1Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>
                        </li>
                        <li className="filter__form-item">
                        <Link to="/" className="filter__href">
                            <svg className="filter__ico3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H5C5.53043 1 6.03914 1.21071 6.41421 1.58579C6.78929 1.96086 7 2.46957 7 3V5C7 5.53043 6.78929 6.03914 6.41421 6.41421C6.03914 6.78929 5.53043 7 5 7H3C2.46957 7 1.96086 6.78929 1.58579 6.41421C1.21071 6.03914 1 5.53043 1 5V3Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 3C11 2.46957 11.2107 1.96086 11.5858 1.58579C11.9609 1.21071 12.4696 1 13 1H15C15.5304 1 16.0391 1.21071 16.4142 1.58579C16.7893 1.96086 17 2.46957 17 3V5C17 5.53043 16.7893 6.03914 16.4142 6.41421C16.0391 6.78929 15.5304 7 15 7H13C12.4696 7 11.9609 6.78929 11.5858 6.41421C11.2107 6.03914 11 5.53043 11 5V3Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1 13C1 12.4696 1.21071 11.9609 1.58579 11.5858C1.96086 11.2107 2.46957 11 3 11H5C5.53043 11 6.03914 11.2107 6.41421 11.5858C6.78929 11.9609 7 12.4696 7 13V15C7 15.5304 6.78929 16.0391 6.41421 16.4142C6.03914 16.7893 5.53043 17 5 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15V13Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 13C11 12.4696 11.2107 11.9609 11.5858 11.5858C11.9609 11.2107 12.4696 11 13 11H15C15.5304 11 16.0391 11.2107 16.4142 11.5858C16.7893 11.9609 17 12.4696 17 13V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H13C12.4696 17 11.9609 16.7893 11.5858 16.4142C11.2107 16.0391 11 15.5304 11 15V13Z" stroke="#121212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>
                        </li>
                    </ul>
                </div>
            </div>
        {isFilterOpen === true ?     
        <div className='filtered' data-test-id={`filters-${category}`}>
            <div className="filtered__block">
                <span className="filtered__title">
                    COLOR
                </span>
                <ul className="filtered__list flex list-reset" data-test-id="filters-color">
                    {colorResult.map((post) => {
                        return (
                            <li className="filtered__item">
                                <label className="filtered__label">
                                    <input type="checkbox" className="filtered__input" value={post} onClick={selectedColor} data-test-id={`filter-color-${post}`}/>
                                    {post}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="filtered__block">
                <span className="filtered__title">
                    SIZE
                </span>
                <ul className="filtered__list flex list-reset" data-test-id="filters-size">
                    {sizeResult.map((post) => {
                        return (
                            <li className="filtered__item">
                                <label className="filtered__label">
                                    <input type="checkbox" className="filtered__input" value={post} onClick={selectedSize} data-test-id={`filter-size-${post}`}/>
                                    {post}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="filtered__block">
                <span className="filtered__title">
                    BRAND
                </span>
                <ul className="filtered__list flex list-reset" data-test-id="filters-brand">
                    {brandResult.map((post) => {
                        return (
                            <li className="filtered__item">
                                <label className="filtered__label">
                                    <input type="checkbox" className="filtered__input" value={post} onClick={selectedBrand} data-test-id={`filter-brand-${post}`}/>
                                    {post}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="filtered__block">
                 <span className="filtered__title">
                    PRICE
                </span>
                <ul className="filtered__list flex list-reset">
                    <li className="filtered__item">
                        <label className="filtered__label">
                            <input type="checkbox" className="filtered__input" value={"500+"} onClick={selectedPrice}/>
                            $ 500+
                        </label>
                    </li>
                    <li className="filtered__item">
                        <label className="filtered__label">
                            <input type="checkbox" className="filtered__input" value={"200-500"} onClick={selectedPrice}/>
                            $ 200-500
                        </label>
                    </li>
                    <li className="filtered__item">
                        <label className="filtered__label">
                            <input type="checkbox" className="filtered__input" value={"100-200"} onClick={selectedPrice}/>
                            $ 100-200
                        </label>
                    </li>
                    <li className="filtered__item">
                        <label className="filtered__label">
                            <input type="checkbox" className="filtered__input" value={"50-100"} onClick={selectedPrice}/>
                            $ 50-100
                        </label>
                    </li>
                    <li className="filtered__item">
                        <label className="filtered__label">
                            <input type="checkbox" className="filtered__input" value={"0-50"} onClick={selectedPrice}/>
                            $ 0-50
                        </label>
                    </li>
                </ul>
            </div>
        </div>
        : null}
        {isFilterOpen === true ? 
        <div className="filter__chose" id="filter__chose">
            <div className="filter__chose_count" id="filter__chose_count">
                {countProd} Filtered products
            </div>
            <div className="filter__chose_block filter__chose_color" id="filter__chose_color">
            </div>
            <div className="filter__chose_block filter__chose_size" id="filter__chose_size">
            </div>
            <div className="filter__chose_block filter__chose_brand" id="filter__chose_brand">
            </div>
            <div className="filter__chose_block filter__chose_price" id="filter__chose_price">
            </div>
        </div>
        : null}
        

        <div className='clothes' data-test-id={`clothes-${category}`}>
        <ul className="product__list flex list-reset">
            {isLoading ? <Loading /> : null}
            {arr.map(post => {
                // // console.log({post}.post)
                // // function renderAllFilter () {
                // //     if ((filterArr[2].useBrand.length > 0) && (poiskBrand({post}) === true)) {
                // //         return true
                // //     }
                // // }
                // poiskBrand({post})
                // poiskColor({post})
                // poiskSize({post})
                // poiskPrice({post})
                               
                
                return (
                    // poiskBrand({post}) === true ? <ProductHome post={post} key={post.id}/> : null
                    renderAll() === true ? <ProductHome post={post} key={post.id}/> : 
                        (
                            (Rezultat({post}) === true)
                        ?
                        <ProductHome post={post} key={post.id}/>
                        : null)
                )
            })}  
        </ul>
        </div>
        </section>
        <div className="product__bottom">
            <div className="product__load"></div>
        </div>
        </div>
        </>
        
    )
}

export {Category}
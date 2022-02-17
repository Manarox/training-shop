import { Link } from "react-router-dom";
import Data from "./data.json";
import '../components/ProductList.css';

const CategoryHome = (props) => {
    const {category} = props;
    
    const arr = [];

    if ({category}.category === 'women') {
        Data.women.map(post => {
            return (
                arr.push(post)
            )
        })
    } else if ({category}.category === 'men') {
        Data.men.map(post => {
            return (
                arr.push(post)
            )
        })
    } 

    return (
        
        <div className='clothes' data-test-id={`clothes-${category}`}>
        <ul class="product__list flex list-reset">
            {arr.map(post => {
                return (
                    <li class="product__item" data-test-id={`clothes-card-${category}`}>
                        <Link to={`/${category}/${post.id}`}>
                        <div class="product__img-block">
                            <img src={process.env.PUBLIC_URL + "/images" + post.image} alt="Product name" class="product__img" />
                        </div>
                        <div class="product__about flex">
                            <div class="product__name">
                                {post.name}
                            </div>
                            <div class="product__info flex">
                                <div class="product__cost flex">
                                    <div class="product__price">
                                        {post.price}
                                    </div>
                                    <div class="product__old-price">
                                        {post.oldprice}
                                    </div>
                                </div>
                                <div class="product__rating">
                                    <img src={process.env.PUBLIC_URL + "/images/i-star.png"} alt="Rating product" />
                                    <img src={process.env.PUBLIC_URL + "/images/i-star.png"} alt="Rating product" />
                                    <img src={process.env.PUBLIC_URL + "/images/i-star.png"} alt="Rating product" />
                                    <img src={process.env.PUBLIC_URL + "/images/i-star.png"} alt="Rating product" />
                                    <img src={process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
                                </div>
                            </div>
                        </div>
                        </Link>
                    </li>
                );
            })}
        </ul>
        </div>
    )
}

export {CategoryHome}
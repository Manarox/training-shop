import React from 'react';

const Rating = (props) => {
    const {rating} = props;
    return (
        <div className='rating-block'>
            <img src={{rating}.rating >= 1 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
            <img src={{rating}.rating >= 2 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
            <img src={{rating}.rating >= 3 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
            <img src={{rating}.rating >= 4 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
            <img src={{rating}.rating >= 5 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} alt="Rating product" />
		</div>
    )
}

export {Rating}
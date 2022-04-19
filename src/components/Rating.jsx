import React from 'react';

export const Rating = ({ rating, onClickRating }) => {
    // const {rating} = props;
    // console.log({rating})
    return (
        <div className='rating-block'>
            <img src={rating >= 1 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} id="1" alt="Rating product" onClick={onClickRating} />
            <img src={rating >= 2 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} id="2" alt="Rating product" onClick={onClickRating}/>
            <img src={rating >= 3 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} id="3" alt="Rating product" onClick={onClickRating}/>
            <img src={rating >= 4 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} id="4" alt="Rating product" onClick={onClickRating}/>
            <img src={rating >= 5 ? process.env.PUBLIC_URL + "/images/i-star.png" : process.env.PUBLIC_URL + "/images/i-star-empty.png"} id="5" alt="Rating product" onClick={onClickRating}/>
		</div>
    )
}
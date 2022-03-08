import React from 'react';
import { Rating } from '../components/Rating';

const Review = (props) => {
    const {reviews} = props;

    // console.log(`result`, result)

    return (
        <>
            {{reviews}.reviews.map(post => {
                // console.log(post.url)
                return (
                    <div class="reviews__item" id={post.id}>
                        <div class="reviews__fio">
                            <div class="reviews__name">
                            {post.name}
                            </div>
                            <div class="reviews__rating_small">
                                <Rating rating={post.rating}/>
                            </div>
                        </div>
                        <div class="reviews__descr">
                            {post.text}
                        </div>
                    </div>
                )
            })}
        </>   
    )
}

export {Review}
import React from 'react';
import { Rating } from './Rating';

export const Review = (props) => {
    const {reviews} = props;
    return (
        <>
            {{reviews}.reviews.map(post => {
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
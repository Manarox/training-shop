import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

export const Slider = (props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {images} = props;
    // console.log(`arr`, {images})

return (
    <>
    <div className="prod__image flex" data-test-id="product-slider">
        <div className="image__slider">
            <div className="image__navigate">
            <button className="image__btn-up">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15L1 8L8 1" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button className="image__btn-down">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15L1 8L8 1" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            </div>
            <div className="image__img-list">
                <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                navigation={{
                    nextEl: ".image__btn-down", 
                    prevEl: ".image__btn-up",
                }}
                className=".image__img-list"
                direction={'vertical'}
                style={{height: '500px'}}
                >
                {{images}.images.map(post => {
                    // console.log(post.url)
                    return (
                        <SwiperSlide>
                            <div class="image__img-item">
                                {/* <img src={process.env.PUBLIC_URL + "/images/prod-img-1.jpg"} alt="img"/> */}
                                <img src={"https://training.cleverland.by/shop" + post.url} alt="Product name" class="image__small-img" />
                            </div>
                        </SwiperSlide>
                    )
                })}

                    {/* <SwiperSlide>
                    <div class="image__img-item">
                        <img src={process.env.PUBLIC_URL + "/images/prod-img-1.jpg"} alt="img"/>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div class="image__img-item">
                        <img src={process.env.PUBLIC_URL + "/images/prod-img-2.jpg"} alt="img"/>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div class="image__img-item">
                        <img src={process.env.PUBLIC_URL + "/images/prod-img-3.jpg"} alt="img"/>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div class="image__img-item">
                        <img src={process.env.PUBLIC_URL + "/images/prod-img-4.jpg"} alt="img"/>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div class="image__img-item">
                        <img src={process.env.PUBLIC_URL + "/images/prod-img-1.jpg"} alt="img"/>
                    </div>
                    </SwiperSlide> */}


                </Swiper>
            </div>
        </div>

        <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        style={{height: '555px'}}
        >
            {{images}.images.map(post => {
                // console.log(post.url)
                return (
                    <SwiperSlide>
                        <img className="big-image" src={"https://training.cleverland.by/shop" + post.url} alt="img"/>
                    </SwiperSlide>
                )
            })}
            {/* <SwiperSlide>
                <img className="big-image" src={process.env.PUBLIC_URL + "/images/prod-image-full.jpg"} alt="img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img className="big-image" src={process.env.PUBLIC_URL + "/images/prod-image-full.jpg"} alt="img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img className="big-image" src={process.env.PUBLIC_URL + "/images/prod-image-full.jpg"} alt="img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img className="big-image" src={process.env.PUBLIC_URL + "/images/prod-image-full.jpg"} alt="img"/>
            </SwiperSlide>
            <SwiperSlide>
                <img className="big-image" src={process.env.PUBLIC_URL + "/images/prod-image-full.jpg"} alt="img"/>
            </SwiperSlide> */}
        </Swiper>
    </div>
    </>   
    )
}
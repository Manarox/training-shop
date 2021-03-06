import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Home.css';
import { useParams } from "react-router-dom";
import './ProductList.css';
import '../pages/SwiperHome.css';
import { Rating } from './Rating';
import { Unique } from './Unique';
import { Slider } from './Slider';
import { Review } from './Review';
import { ByInCart } from './ByInCart';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation } from "swiper";
import { useSelector } from "react-redux";
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";

export const ProductList = () => {
  const id = useParams();
  const {category} = useParams();
  const arr = [];
  const dispatch = useDispatch();
  const reviewLoad = useSelector((state) => state.reviewReducer);
  const productsLoad = useSelector(state => state.loadReducer.products)
  
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
        );
      })
  }
  
  var resultArr = arr.filter(function(number) {
      return number.id === id.id;
  });

  let result = resultArr[0].images.reduce((accumulator, currentValue) => {
    if (accumulator.every(item => !(item.color === currentValue.color))) accumulator.push(currentValue);
    return accumulator;
  }, []);

  //Функция цвета
  const [colorr, setColor] = useState(result[0].color);
  const [colorr_url, setColorUrl] = useState(result[0].url);

  const changeImage = (e) => {
      setColor(e.currentTarget.id);
      setColorUrl(e.currentTarget.alt);
  };

  useEffect(() => {
      setColor(result[0].color);
      setColorUrl(result[0].url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.id]);
  //Конец функции цвета
  //Функция размера
  const [sizee, setSize] = useState(resultArr[0].sizes[0]);

  const changeSize = (e) => {
      setSize(e.currentTarget.id);
    };

  useEffect(() => {
      setSize(resultArr[0].sizes[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.id]);

  //Сборка продукта
    let arrColorUrl = []
    arrColorUrl.color = {colorr}.colorr
    arrColorUrl.url = {colorr_url}.colorr_url
    arrColorUrl.size = {sizee}.sizee
    arrColorUrl.price = resultArr[0].price
    arrColorUrl.oldprice = resultArr[0].price
    arrColorUrl.name = resultArr[0].name
    arrColorUrl.counter = 1
    arrColorUrl.id = resultArr[0].id

  const [isReviewOpen, toggleReview] = useState(false);

  function tooggleReviewMode() {
    toggleReview(!isReviewOpen);
    document.body.style.overflow = 'hidden';
    if (!isReviewOpen === false) {
      document.body.style.overflow = 'inherit';
    }
    dispatch({ type: 'SEND_REVIEW_NULL' });
    formik.errors.name = []
    formik.errors.text = []
    formik.values.name = []
    formik.values.text = []
    setRaitingForm(1);
  }

  let [raitingForm, setRaitingForm] = useState(1);

  const changeRaitingForm = (e) => {
    setRaitingForm(e.currentTarget.id);
  };

  const initialValues = {
    id: resultArr[0].id,
    name: "",
    text: "",
  }

  const formik = useFormik({
    initialValues,
    
    onSubmit: (values) => {
      formik.values.rating = Number(raitingForm);
      dispatch({ type: 'SEND_REVIEW', payload: formik.values})
      dispatch({ type: 'SEND_REVIEW_SAGA', payload: formik.values})
    },
    validate: (values) => {
      let error = {};
      if (!values.name) {
        error.name = 'Введите имя';
      }
      if (!values.text) {
        error.text = 'Введите отзыв';
      }
       
      return error;
    },
  });

  useEffect(() => {
    if (reviewLoad.isDataProd) {
      dispatch({ type: 'LOADPROD' });
      toggleReview(false);
      document.body.style.overflow = 'inherit'
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewLoad.isDataProd, dispatch]);

  const { isError, isLoadingSuccess } = useSelector((state) => state.reviewReducer);

return (

<div className="page-product" data-test-id={`product-page-${category}`}>
    <div class="background-grey_f8">
      <section class="bread flex container">
        <div class="bread__wrap">
          <ul class="bread__list flex list-reset">
            <li class="bread__item">
              <Link to="/" className="bread__href">Home</Link>
            </li>
            <li class="bread__item">
              <Link to={`/${category}`} className="bread__href">{resultArr[0].category}</Link>
            </li>
            <li class="bread__item bread__item_active">
              <Link to={`/${category}/${resultArr[0].id}`} className="bread__href">{resultArr[0].name}</Link>
            </li>
          </ul>
          <button class="bread__btn">
            Share
          </button>
        </div>
        <div class="bread__title">
          <h1 class="bread__h1"> {resultArr[0].name} </h1>
        </div>

        <div class="bread__bot flex">
          <div class="bread__left flex">
            <Rating rating={resultArr[0].rating}/>
            <div class="bread__rating-text">{resultArr[0].reviews.length} Reviews</div>
          </div>
          <div class="bread__right flex">
            <ul class="bread__list-info flex list-reset">
              <li class="list-info__item">
                <span class="list-info__name">SKU:</span>
                <span class="list-info__value">777</span>
              </li>
              <li class="list-info__item">
                <span class="list-info__name">Availability:</span>
                <span class="list-info__value">In Stock</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <section class="prod flex container">

    <Slider images={resultArr[0].images}/>

    <div class="prod__info flex">
      <div class="color">
          <div class="color__title">
              <span class="color__text">Color:</span><span class="color__span">{colorr}</span>
          </div>

          <ul class="color__image-list flex list-reset">

              {result.map((post) => {
                  return (

                  <li class="color__item">
                      <img src={"https://training.cleverland.by/shop" + post.url} className={colorr === post.color ? 'color__image color__image_active' : 'color__image'} alt={post.url} onClick={(e) => changeImage(e)} id={post.color} value={post.url}/>
                  </li>

                  )
              })}

          </ul>

      </div>

      <div class="size">
          <div class="size__title">
              <span class="color__text">size:</span><span class="color__span">{sizee}</span>
          </div>
          <ul class="size__image-list flex list-reset">
              {resultArr[0].sizes.map((post) => {
                  return (

                      <li className="size__item">
                          <button className={post === sizee ? 'size__btn size__btn_active' : 'size__btn'} onClick={(e) => changeSize(e)} id={post}>{post}</button>
                      </li>

                  )
              })}
          </ul>
          <div class="size__guide">
              <button className="size__guide-btn">Size guide</button>
          </div>
      </div>
      <div class="strip"></div>
      <div class="actions">
        <div class="actions__price">
          {resultArr[0].price}$
        </div>
        <div class="actions__add">
          <ByInCart productitem={arrColorUrl}/>
        </div>
        <div class="actions__like">
          <button class="action__btn">
            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.31804 2.31804C1.90017 2.7359 1.5687 3.23198 1.34255 3.77795C1.1164 4.32392 1 4.90909 1 5.50004C1 6.09099 1.1164 6.67616 1.34255 7.22213C1.5687 7.7681 1.90017 8.26418 2.31804 8.68204L10 16.364L17.682 8.68204C18.526 7.83812 19.0001 6.69352 19.0001 5.50004C19.0001 4.30656 18.526 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3066 1.00001 12.162 1.47412 11.318 2.31804L10 3.63604L8.68204 2.31804C8.26417 1.90017 7.7681 1.5687 7.22213 1.34255C6.67616 1.1164 6.09099 1 5.50004 1C4.90909 1 4.32392 1.1164 3.77795 1.34255C3.23198 1.5687 2.7359 1.90017 2.31804 2.31804V2.31804Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="actions__compare">
          <button class="action__btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 19H13M1 4L4 5L1 4ZM4 5L1 14C1.8657 14.649 2.91852 14.9999 4.0005 14.9999C5.08248 14.9999 6.1353 14.649 7.001 14L4 5ZM4 5L7 14L4 5ZM4 5L10 3L4 5ZM16 5L19 4L16 5ZM16 5L13 14C13.8657 14.649 14.9185 14.9999 16.0005 14.9999C17.0825 14.9999 18.1353 14.649 19.001 14L16 5ZM16 5L19 14L16 5ZM16 5L10 3L16 5ZM10 1V3V1ZM10 19V3V19ZM10 19H7H10Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="strip"></div>
      <div class="advantage-prod">
        <div class="advantage-prod__item">
          <svg class="advantage-prod__svg" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 12V2C11 1.73478 10.8946 1.48043 10.7071 1.29289C10.5196 1.10536 10.2652 1 10 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V12C1 12.2652 1.10536 12.5196 1.29289 12.7071C1.48043 12.8946 1.73478 13 2 13H3M11 12C11 12.2652 10.8946 12.5196 10.7071 12.7071C10.5196 12.8946 10.2652 13 10 13H7M11 12V4C11 3.73478 11.1054 3.48043 11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3H14.586C14.8512 3.00006 15.1055 3.10545 15.293 3.293L18.707 6.707C18.8946 6.89449 18.9999 7.14881 19 7.414V12C19 12.2652 18.8946 12.5196 18.7071 12.7071C18.5196 12.8946 18.2652 13 18 13H17M11 12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13H13M3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13M3 13C3 12.4696 3.21071 11.9609 3.58579 11.5858C3.96086 11.2107 4.46957 11 5 11C5.53043 11 6.03914 11.2107 6.41421 11.5858C6.78929 11.9609 7 12.4696 7 13M17 13C17 13.5304 16.7893 14.0391 16.4142 14.4142C16.0391 14.7893 15.5304 15 15 15C14.4696 15 13.9609 14.7893 13.5858 14.4142C13.2107 14.0391 13 13.5304 13 13M17 13C17 12.4696 16.7893 11.9609 16.4142 11.5858C16.0391 11.2107 15.5304 11 15 11C14.4696 11 13.9609 11.2107 13.5858 11.5858C13.2107 11.9609 13 12.4696 13 13" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Shipping & Delivery
        </div>
        <div class="advantage-prod__item">
          <svg class="advantage-prod__svg" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.582 5.99993H1V0.999928L1.582 5.99993ZM1.582 5.99993C2.24585 4.35806 3.43568 2.98284 4.96503 2.08979C6.49438 1.19674 8.2768 0.836341 10.033 1.06507C11.7891 1.2938 13.4198 2.09872 14.6694 3.3537C15.919 4.60869 16.7168 6.24279 16.938 7.99993M1.582 5.99993H6M16.419 11.9999H17V16.9999L16.419 11.9999ZM16.419 11.9999C15.7542 13.6408 14.564 15.015 13.0348 15.9072C11.5056 16.7995 9.72374 17.1595 7.9681 16.9308C6.21246 16.7022 4.5822 15.8978 3.33253 14.6437C2.08287 13.3895 1.28435 11.7564 1.062 9.99993M16.419 11.9999H12" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Returns & Exchanges
        </div>
        <div class="advantage-prod__item">
          <svg class="advantage-prod__svg" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.8">
            <path d="M1 4L8.89 9.26C9.21866 9.47928 9.6049 9.5963 10 9.5963C10.3951 9.5963 10.7813 9.47928 11.11 9.26L19 4M3 15H17C17.5304 15 18.0391 14.7893 18.4142 14.4142C18.7893 14.0391 19 13.5304 19 13V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7893 2.46957 15 3 15Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          </svg>
          Ask a question
        </div>
      </div>
      <div class="guaranteed">
        <div class="guaranteed__title">
          <div class="guaranteed__text">
            guaranteed safe checkout
          </div>
          <div class="guaranteed__strip"></div>
        </div>
        <div class="guaranteed__icons">
          <ul class="guaranteed__list flex list-reset">
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-stripe.png"} alt="stripe" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-aes.png"} alt="aes" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-paypal.png"} alt="paypal" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-visa.png"} alt="visa" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-mastercard.png"} alt="mastercard" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-discover.png"} alt="discover" />
            </li>
            <li class="guaranteed__item">
              <img src={process.env.PUBLIC_URL + "/images/icon-american.png"} alt="american" />
            </li>
          </ul>
        </div>
      </div>
      <div class="strip"></div>
      <div class="description">
        DESCRIPTION
      </div>
      <div class="strip"></div>
      <div class="info-prod">
        <div class="info-prod__title">
          ADDITIONAL INFORMATION
        </div>
        <ul class="info-prod__list flex list-reset">
          <li class="info-prod__item">
            Color: <span class="info-prod__span"><Unique content={resultArr[0].images}/></span>
          </li>
          <li class="info-prod__item">
            Size: <span class="info-prod__span">{resultArr[0].sizes.join(`, `)}</span>
          </li>
          <li class="info-prod__item">
            Material: <span class="info-prod__span">{resultArr[0].material}</span>
          </li>
        </ul>
      </div>
      <div class="strip"></div>

      <div class="reviews">
        <div class="reviews__title">
          REVIEWS
        </div>
        <div class="reviews__top">
          <div class="reviews__rating">
            <Rating rating={resultArr[0].rating}/>
            <div class="reviews__count">
              {resultArr[0].reviews.length} Reviews
            </div>
          </div>
          <div className={classNames('reviews__write', { visible_basket_wrapp: isReviewOpen })}  onClick={tooggleReviewMode}>
          
            <button class="reviews__btn" data-test-id="review-button">
              <svg class="reviews__svg-btn" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5H15H5ZM5 9H9H5ZM10 17L6 13H3C2.46957 13 1.96086 12.7893 1.58579 12.4142C1.21071 12.0391 1 11.5304 1 11V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V11C19 11.5304 18.7893 12.0391 18.4142 12.4142C18.0391 12.7893 17.5304 13 17 13H14L10 17Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Write a review
            </button>
          </div>
        </div>

        <Review reviews={resultArr[0].reviews}/>

      </div>
      <div class="strip"></div>
    </div>
  </section>

    <div className={classNames('review__wrapp', { visible_review_wrapp: isReviewOpen })} onClick={tooggleReviewMode}></div>

    {isReviewOpen === true ? 

    <div className={classNames('reviewform', { visible_review: isReviewOpen })} >
      <div className="reviewform__wrap" data-test-id="review-modal">

        <form className="reviewform__form" name="form" onSubmit={formik.handleSubmit}>

          <button className="reviewform__close" onClick={tooggleReviewMode}>

            <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

          </button>

          <div className="reviewform__title">
            <h2 className="reviewform__title__h2">Write a review</h2>
          </div>

          <div className="reviewform__raiting">
            <Rating rating={raitingForm} onClickRating={changeRaitingForm}/>
          </div>

          <div className="reviewform__name">
            <input
              className="reviewform__input"
              data-test-id="review-name-field"
              type="text"
              name="name"
              placeholder="Имя"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className="formik__error">{formik.errors.name}</span>
          </div>

          <div className="reviewform__rev">
            <textarea
              className="reviewform__rextarea"
              data-test-id="review-text-field"
              placeholder="Комментарий"
              name="text"
              rows="10"
              cols="30"
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
            </textarea>
            <span className="formik__error">{formik.errors.text}</span>

          </div>
          <div className="reviewform__send">

            {reviewLoad.isLoading ? (
                <button className="reviewform__btn" type="submit" data-test-id="review-submit-button" disabled>
                  <span className="loaderSpiner"></span>
                  Send
                </button>
            ) : (
                <button
                  className="reviewform__btn"
                  data-test-id="review-submit-button"
                  type="submit"
                  disabled={!(formik.values.name && formik.values.text) ? true : false}>
                  Send
                </button>
            )}

            {isError ? <span className="error-email success-email_review">Ошибка при отправке отзыва</span> : null}
            {isLoadingSuccess ? <span className="success-email success-email_review">Отзыв отправлен успешно</span> : null}

          </div>
        </form>
      </div>
    </div>

    : null}

<section class="related flex container">
    <div class="related__top">
      <div class="related__title">
        RELATED PRODUCTS
      </div>
      <div class="related__slide">
        <button class="related__left">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15L1 8L8 1" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="related__right">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8 8L1 15" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  <Swiper
    data-test-id='related-slider'
    slidesPerView={4}
    spaceBetween={30}
    freeMode={true}
    pagination={{
      clickable: false,
    }}
    modules={[FreeMode, Navigation]}
    navigation={{
      nextEl: ".related__right", 
      prevEl: ".related__left",
    }}
    className="container swiper__related"
    breakpoints={{
      10: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      300: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1110: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1111: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    }}
  >
  <div class="related__blog">
    <ul class="product__list flex list-reset">
    {arr.map(post => {
        return (
        <SwiperSlide>   
          <li class="product__item">
            <Link key={post.id} to={`/${category}/${post.id}`}>
              <div class="product__img-block">
                <img src={"https://training.cleverland.by/shop" + post.images[0]?.url} alt="Product name"/>
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
          </SwiperSlide>
        );
      })}
    
    </ul>
  </div>
  </Swiper>
</section>

  </div>
  )
}
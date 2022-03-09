import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import { CategoryHome } from '../pages/CategoryHome';
import { Link } from 'react-router-dom';
import './Home.css';
import './SwiperHome.css';


const Home = () => {

    return (
<main className="main">

  <div className='app' data-test-id='app'>
    <section className="banners flex container">
      <ul className="banners__list flex list-reset">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper" data-test-id='main-slider'>
          <SwiperSlide>
          <li className="banners__item banners__item_height banners__item_card1">
            <Link to="/" className="banners__href">
              <span className="banners__test">Banner</span>
              your Title text
            </Link>
          </li>
          </SwiperSlide>
          <SwiperSlide>
          <li className="banners__item banners__item_height banners__item_card1">
            <Link to="/" className="banners__href">
              <span className="banners__test">Banner</span>
              your Title text
            </Link>
          </li>
          </SwiperSlide>
          <SwiperSlide>
          <li className="banners__item banners__item_height banners__item_card1">
            <Link to="/" className="banners__href">
              <span className="banners__test">Banner</span>
              your Title text
            </Link>
          </li>
          </SwiperSlide>
          <SwiperSlide>
          <li className="banners__item banners__item_height banners__item_card1">
            <Link to="/" className="banners__href">
              <span className="banners__test">Banner</span>
              your Title text
            </Link>
          </li>
          </SwiperSlide>
        </Swiper>
        <div className="banners__wrap-column banners__item_height">
          <div className="banners__wrap-row">
            <li className="banners__item banners__item_card2">
              <Link to="women" className="banners__href banners__href_small">
                Women
              </Link>
            </li>
            <li className="banners__item banners__item_card3">
              <Link to="men" className="banners__href banners__href_small">
                men
              </Link>
            </li>
          </div>
          <li className="banners__item banners__item_card4">
            <Link to="/" className="banners__href">
              Accessories
            </Link>
          </li>
        </div>
      </ul>
    </section>

    <section className="advantage flex container">
      <div className="advantage__item advantage__item_card1">
        <span className="advantage__tag">FREE SHIPPING</span>
        <p className="anvantage__text">On all UA order or order above $100</p>
      </div>
      <div className="advantage__item advantage__item_card2">
        <span className="advantage__tag">30 DAYS RETURN</span>
        <p className="anvantage__text">Simply return it within 30 days for an exchange</p>
      </div>
      <div className="advantage__item advantage__item_card3">
        <span className="advantage__tag">SUPPORT 24/7</span>
        <p className="anvantage__text">Contact us 24 hours a day, 7 days a week</p>
      </div>
    </section>

  <div className="grey-line grey-line_margin-big"></div>

  <section className="product flex container">

    <CategoryHome category={'women'}/>

  </section>

  <section className="product flex container">

    <CategoryHome category={'men'}/>
    
  </section>

  <section className="news flex container">
    <ul className="news__list flex list-reset">
      <li className="news__item news__item_height banners__item news__item_card2">
        <Link to="/" className="banners__href banners__href_news">
          <span className="banners__test banners__test_small">Sale</span>
          Get UP to <span className="news__item_span">50% off</span>
        </Link>
      </li>
      <li className="news__item news__item_height banners__item news__item_card1">
        <Link to="/" className="banners__href banners__href_news">
          <span className="banners__test banners__test_small">New Season</span>
          lookbook collection
        </Link>
      </li>
    </ul>
  </section>

  <div className="background-grey">
    <section className="subscrib flex container">
      <div className="subscrib__form">
        <div className="subscrib__offer">
          Special Offer
        </div>
        <div className="subscrib__title">
          Subscribe
        </div>
        <div className="subscrib__title">
          And <span className="ad__item_span">Get 10% Off</span>
        </div>
        <form action="https://jsonplaceholder.typicode.com/posts" className="form flex" method="post" name="form">
          <input name="amail" type="text" className="form__input" placeholder="Enter your email"/>
          <button type="submit" name="submit" className="form__button">Subscribe</button>
        </form>
      </div>
      <div className="subscrib-bg"></div>
      <div className="subscrib-bg-man"></div>
    </section>
  </div>

  <section className="latest flex container">
    <div className="latest__navigate">
      <div className="latest__title">
        <h2 className="latest__h2">LATEST FROM BLOG</h2>
      </div>
      <div className="latest__see-all">
        SEE ALL
      </div>
    </div>
    <div className="latest__list">
      <div className="latest__item">
        <div className="latest__img">
          <img src={process.env.PUBLIC_URL + "/images/latest-1.jpg"} alt=''/>
        </div>
        <div className="latest__info">
          <div className="info__title">
            The Easiest Way to Break
          </div>
          <div className="info__text">
            But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
          </div>
        </div>
      </div>
      <div className="latest__item">
        <div className="latest__img">
          <img src={process.env.PUBLIC_URL + "/images/latest-2.jpg"} alt=''/>
        </div>
        <div className="latest__info">
          <div className="info__title">
            Wedding Season
          </div>
          <div className="info__text">
            But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
          </div>
        </div>
      </div>
      <div className="latest__item">
        <div className="latest__img">
          <img src={process.env.PUBLIC_URL + "/images/latest-3.jpg"} alt=''/>
        </div>
        <div className="latest__info">
          <div className="info__title">
            Recent Favorites On Repeat
          </div>
          <div className="info__text">
            But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</main>   
    )
}

export {Home}
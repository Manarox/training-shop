import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
    <>
    <footer>
    <div data-test-id='footer'>
    <div className="black-background">
      <section className="black-line black-line_footer container">
        <div className="black-line__left flex">
          <div className="black-line__item flex">
            <Link to="/training-shop" className="black-line__text black-line__text_footer">BE IN TOUCH WITH US:</Link>
          </div>
          <div className="black-line__item flex">
            <form action="https://jsonplaceholder.typicode.com/posts" className="form-footer" method="post" name="form">
              <input name="amail" type="text" className="form-footer__input" placeholder="Enter your email" />
              <button type="submit" name="submit" className="form-footer__button">Join Us</button>
            </form>
          </div>

        </div>
        <div className="black-line__icons flex">
          <ul className="black-line__icon-list flex list-reset">
            <li className="black-line__icon-item">
              <svg width="18" height="18" viewbox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.0667 7.03693C13.0667 3.6652 10.3513 0.93335 6.99999 0.93335C3.64864 0.93335 0.933319 3.6652 0.933319 7.03693C0.933319 10.0833 3.15181 12.6084 6.05207 13.0667V8.80131H4.51094V7.03693H6.05207V5.69218C6.05207 4.16259 6.95718 3.31768 8.34346 3.31768C9.00737 3.31768 9.70161 3.4368 9.70161 3.4368V4.93809H8.93643C8.18299 4.93809 7.9479 5.40865 7.9479 5.89128V7.03693H9.63042L9.36134 8.80131H7.9479V13.0667C10.8482 12.6084 13.0667 10.0833 13.0667 7.03693Z" fill="white"></path>
              </svg>
            </li>
            <li className="black-line__icon-item">
              <svg width="18" height="18" viewbox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4531 1.99414C12.9774 2.20469 12.4688 2.34688 11.9328 2.4125C12.4797 2.08438 12.9008 1.56484 13.0977 0.946875C12.5863 1.25039 12.0203 1.47187 11.416 1.58945C10.932 1.07266 10.243 0.75 9.48283 0.75C8.01993 0.75 6.83595 1.93672 6.83595 3.39961C6.83595 3.60742 6.85782 3.80977 6.90431 4.00391C4.70314 3.89453 2.75079 2.83906 1.4465 1.23398C1.21954 1.625 1.08829 2.08164 1.08829 2.56562C1.08829 3.48437 1.55861 4.29648 2.26954 4.77227C1.83204 4.76133 1.42189 4.64102 1.06642 4.44141V4.47422C1.06642 5.75938 1.9797 6.82852 3.19103 7.07188C2.96954 7.13203 2.73439 7.16484 2.49376 7.16484C2.32423 7.16484 2.15743 7.14844 1.99611 7.11562C2.33243 8.16836 3.31134 8.93398 4.47072 8.95586C3.56564 9.6668 2.42267 10.0906 1.18126 10.0906C0.967981 10.0906 0.757434 10.077 0.549622 10.0523C1.7172 10.8125 3.109 11.25 4.60197 11.25C9.47736 11.25 12.1406 7.21133 12.1406 3.70859C12.1406 3.59375 12.1379 3.47891 12.1324 3.3668C12.6492 2.99219 13.0977 2.52734 13.4531 1.99414Z" fill="white"></path>
              </svg>
            </li>
            <li className="black-line__icon-item">
              <svg width="18" height="18" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4.17751C4.99649 4.17751 4.17754 4.99645 4.17754 5.99997C4.17754 7.00348 4.99649 7.82243 6 7.82243C7.00352 7.82243 7.82247 7.00348 7.82247 5.99997C7.82247 4.99645 7.00352 4.17751 6 4.17751ZM11.466 5.99997C11.466 5.24528 11.4729 4.49743 11.4305 3.74411C11.3881 2.86911 11.1885 2.09254 10.5486 1.4527C9.90743 0.81149 9.13223 0.613248 8.25723 0.570866C7.50254 0.528483 6.75469 0.535319 6.00137 0.535319C5.24668 0.535319 4.49883 0.528483 3.74551 0.570866C2.87051 0.613248 2.09395 0.812858 1.45411 1.4527C0.812894 2.09391 0.614652 2.86911 0.572269 3.74411C0.529887 4.49879 0.536723 5.24665 0.536723 5.99997C0.536723 6.75329 0.529887 7.5025 0.572269 8.25583C0.614652 9.13083 0.814262 9.90739 1.45411 10.5472C2.09532 11.1884 2.87051 11.3867 3.74551 11.4291C4.5002 11.4714 5.24805 11.4646 6.00137 11.4646C6.75606 11.4646 7.50391 11.4714 8.25723 11.4291C9.13223 11.3867 9.90879 11.1871 10.5486 10.5472C11.1898 9.90602 11.3881 9.13083 11.4305 8.25583C11.4742 7.5025 11.466 6.75465 11.466 5.99997ZM6 8.80407C4.44825 8.80407 3.1959 7.55172 3.1959 5.99997C3.1959 4.44821 4.44825 3.19586 6 3.19586C7.55176 3.19586 8.80411 4.44821 8.80411 5.99997C8.80411 7.55172 7.55176 8.80407 6 8.80407ZM8.91895 3.7359C8.55665 3.7359 8.26407 3.44333 8.26407 3.08102C8.26407 2.71872 8.55665 2.42614 8.91895 2.42614C9.28125 2.42614 9.57383 2.71872 9.57383 3.08102C9.57394 3.16705 9.55708 3.25226 9.5242 3.33176C9.49133 3.41126 9.4431 3.4835 9.38226 3.54433C9.32143 3.60517 9.24919 3.6534 9.16969 3.68627C9.09019 3.71915 9.00498 3.73601 8.91895 3.7359Z" fill="white"></path>
              </svg>
            </li>
            <li className="black-line__icon-item">
              <svg width="18" height="18" viewbox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0.875C3.61758 0.875 0.875 3.61758 0.875 7C0.875 9.50742 2.38438 11.6621 4.5418 12.6109C4.52539 12.1844 4.53906 11.6703 4.64844 11.2055C4.76602 10.7078 5.43594 7.8668 5.43594 7.8668C5.43594 7.8668 5.23906 7.47578 5.23906 6.89883C5.23906 5.99101 5.76406 5.31289 6.42031 5.31289C6.97813 5.31289 7.24609 5.73125 7.24609 6.23164C7.24609 6.79219 6.88789 7.62891 6.70469 8.40547C6.55156 9.05625 7.03008 9.58398 7.67266 9.58398C8.83203 9.58398 9.61406 8.09375 9.61406 6.32734C9.61406 4.98477 8.70898 3.98125 7.06562 3.98125C5.20898 3.98125 4.04961 5.36758 4.04961 6.91523C4.04961 7.44844 4.2082 7.82578 4.4543 8.11562C4.56641 8.24961 4.58281 8.3043 4.5418 8.45742C4.51172 8.56953 4.44609 8.84023 4.41602 8.94961C4.375 9.10547 4.24922 9.16016 4.10977 9.10273C3.25391 8.75273 2.85469 7.81758 2.85469 6.76211C2.85469 5.02305 4.32305 2.93672 7.23242 2.93672C9.57031 2.93672 11.1098 4.6293 11.1098 6.44492C11.1098 8.84844 9.77266 10.6422 7.80391 10.6422C7.14219 10.6422 6.52148 10.284 6.3082 9.8793C6.3082 9.8793 5.95273 11.2902 5.87617 11.5637C5.74766 12.0367 5.49336 12.507 5.26094 12.8762C5.81055 13.0375 6.39297 13.1277 6.99727 13.1277C10.3797 13.1277 13.1223 10.3852 13.1223 7.00273C13.125 3.61758 10.3824 0.875 7 0.875Z" fill="white"></path>
              </svg>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <section className="footer flex container">
      <div className="footer__nav flex">
        <div className="footer__title">
          Categories
        </div>
        <ul className="footer__list list-reset">
          <li className="footer__item">
            <Link to="men" className="footer__link" data-test-id={'footer-nav-link-men'}>Men</Link>
          </li>
          <li className="footer__item">
            <Link to="women" className="footer__link" data-test-id={'footer-nav-link-women'}>Women</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-accessories'}>Accessories</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-beauty'}>Beauty</Link>
          </li>
        </ul>
      </div>
      <div className="footer__nav flex">
        <div className="footer__title">
          Infomation
        </div>
        <ul className="footer__list list-reset">
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-About-us'}>About Us</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Contact-Us'}>Contact Us</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Blog'}>Blog</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-FAQs'}>FAQs</Link>
          </li>
        </ul>
      </div>
      <div className="footer__nav flex">
        <div className="footer__title">
          Useful links
        </div>
        <ul className="footer__list list-reset">
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Terms-&-Conditions'}>Terms & Conditions</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Returns-&-Exchanges'}>Returns & Exchanges</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Shipping-&-Delivery'}>Shipping & Delivery</Link>
          </li>
          <li className="footer__item">
            <Link to="/training-shop" className="footer__link" data-test-id={'footer-nav-link-Privacy-PolicyBeauty'}>Privacy PolicyBeauty</Link>
          </li>
        </ul>
      </div>
      <div className="footer__nav flex">
        <div className="footer__title">
          CONTACT US
        </div>
        <ul className="footer__list list-reset">
          <li className="footer__item footer__item_icon1">
            Belarus, Gomel, Lange 17
          </li>
          <li className="footer__item footer__item_icon2">
            <a href="tel:+375291002030" className="footer__link">+375 29 100 20 30</a>
          </li>
          <li className="footer__item footer__item_icon3">
            All week 24/7
          </li>
          <li className="footer__item footer__item_icon4">
            <a href="mailto:info@clevertec.ru" className="footer__link">info@clevertec.ru</a>
          </li>
        </ul>
      </div>
    </section>

      <div className="grey-bg">
        <section className="copyright flex container">
          <div className="copyright__copy">
            Copyright © 2032 all rights reserved
          </div>
          <div className="copyright__payments">
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/Stripe_x42.png"} alt="Stripe" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/AES256_x42.png"} alt="AES" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/paypal_2_x42.png"} alt="paypal" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/visa_x42.png"} alt="vis" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/mastercard_x42.png"} alt="mastercard" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/discover_x42.png"}alt="discover" />
            <img className="payments__img" src={process.env.PUBLIC_URL + "/images/american-express_x42.png"} alt="american-express" />
          </div>
          <div className="copyright__clever">
            <p>Clevertec.ru/training</p>
          </div>
        </section>
      </div>
    </div>
  </footer>    
    </>
    )
}

export {Footer}
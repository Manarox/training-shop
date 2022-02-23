import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import classNames from 'classnames';
let num = 0;

const Header = () => {
    const [isMenuOpen, toggleMenu] = useState(false);
    
    function tooggleMenuMode() {
        toggleMenu(!isMenuOpen);
        document.body.style.overflow = 'hidden';
        num++;
        if (num%2 === 0) {
          document.body.style.overflow = 'inherit';
        }
    }

    return (
    <>
    <header className="header">
      <div className='header' data-test-id='header'>
      <div className="black-background">
          <section className="black-line container">
            <div className="black-line__left flex">
              <div className="black-line__item flex">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75 1.91667C0.75 1.60725 0.872916 1.3105 1.09171 1.09171C1.3105 0.872916 1.60725 0.75 1.91667 0.75H3.83C3.95238 0.750093 4.07163 0.788673 4.17087 0.860279C4.27012 0.931885 4.34433 1.03289 4.383 1.149L5.25683 3.76992C5.30111 3.90311 5.29587 4.04781 5.24208 4.17746C5.1883 4.30711 5.08956 4.41301 4.964 4.47575L3.64742 5.13492C4.29277 6.56323 5.43677 7.70723 6.86508 8.35258L7.52425 7.036C7.58698 6.91044 7.69289 6.8117 7.82254 6.75792C7.95219 6.70413 8.09689 6.69889 8.23008 6.74317L10.851 7.617C10.9672 7.6557 11.0683 7.73 11.1399 7.82936C11.2115 7.92872 11.25 8.0481 11.25 8.17058V10.0833C11.25 10.3928 11.1271 10.6895 10.9083 10.9083C10.6895 11.1271 10.3928 11.25 10.0833 11.25H9.5C4.66767 11.25 0.75 7.33233 0.75 2.5V1.91667Z" fill="white" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="tel:+375291002030" className="black-line__text">+375 29 100 20 30</a>
              </div>
              <div className="black-line__item flex">
                <svg width="12" height="12" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53502 1.83503C2.454 0.916055 3.7004 0.39978 5.00002 0.39978C6.29965 0.39978 7.54605 0.916055 8.46502 1.83503C9.384 2.75401 9.90028 4.0004 9.90028 5.30003C9.90028 6.59966 9.384 7.84606 8.46502 8.76503L5.00002 12.23L1.53502 8.76503C1.07996 8.31002 0.718988 7.76982 0.472709 7.17529C0.226429 6.58077 0.0996704 5.94355 0.0996704 5.30003C0.0996704 4.65651 0.226429 4.01929 0.472709 3.42477C0.718988 2.83024 1.07996 2.29004 1.53502 1.83503ZM5.00002 6.70003C5.37133 6.70003 5.72742 6.55253 5.98997 6.28998C6.25253 6.02743 6.40003 5.67133 6.40003 5.30003C6.40003 4.92873 6.25253 4.57263 5.98997 4.31008C5.72742 4.04753 5.37133 3.90003 5.00002 3.90003C4.62872 3.90003 4.27263 4.04753 4.01008 4.31008C3.74752 4.57263 3.60002 4.92873 3.60002 5.30003C3.60002 5.67133 3.74752 6.02743 4.01008 6.28998C4.27263 6.55253 4.62872 6.70003 5.00002 6.70003Z" fill="white"/>
                </svg>
                <p className="black-line__text">Belarus, Gomel, Lange 17</p>
              </div>
              <div className="black-line__item flex">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C6.32608 10 7.59785 9.47322 8.53553 8.53553C9.47322 7.59785 10 6.32608 10 5C10 3.67392 9.47322 2.40215 8.53553 1.46447C7.59785 0.526784 6.32608 0 5 0C3.67392 0 2.40215 0.526784 1.46447 1.46447C0.526784 2.40215 0 3.67392 0 5C0 6.32608 0.526784 7.59785 1.46447 8.53553C2.40215 9.47322 3.67392 10 5 10ZM5.625 2.5C5.625 2.33424 5.55915 2.17527 5.44194 2.05806C5.32473 1.94085 5.16576 1.875 5 1.875C4.83424 1.875 4.67527 1.94085 4.55806 2.05806C4.44085 2.17527 4.375 2.33424 4.375 2.5V5C4.37504 5.16575 4.44091 5.32469 4.55813 5.44187L6.32563 7.21C6.38369 7.26807 6.45263 7.31413 6.5285 7.34556C6.60437 7.37699 6.68569 7.39316 6.76781 7.39316C6.84993 7.39316 6.93125 7.37699 7.00712 7.34556C7.08299 7.31413 7.15193 7.26807 7.21 7.21C7.26807 7.15193 7.31413 7.08299 7.34556 7.00712C7.37699 6.93125 7.39316 6.84993 7.39316 6.76781C7.39316 6.68569 7.37699 6.60437 7.34556 6.5285C7.31413 6.45263 7.26807 6.38369 7.21 6.32563L5.625 4.74125V2.5Z" fill="white"/>
                </svg>
                <p className="black-line__text">All week 24/7</p>
              </div>
            </div>
            <div className="black-line__icons flex">
              <ul className="black-line__icon-list flex list-reset">
                <li className="black-line__icon-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0667 7.03693C13.0667 3.6652 10.3513 0.93335 6.99999 0.93335C3.64864 0.93335 0.933319 3.6652 0.933319 7.03693C0.933319 10.0833 3.15181 12.6084 6.05207 13.0667V8.80131H4.51094V7.03693H6.05207V5.69218C6.05207 4.16259 6.95718 3.31768 8.34346 3.31768C9.00737 3.31768 9.70161 3.4368 9.70161 3.4368V4.93809H8.93643C8.18299 4.93809 7.9479 5.40865 7.9479 5.89128V7.03693H9.63042L9.36134 8.80131H7.9479V13.0667C10.8482 12.6084 13.0667 10.0833 13.0667 7.03693Z" fill="white"/>
                  </svg>
                </li>
                <li className="black-line__icon-item">
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4531 1.99414C12.9774 2.20469 12.4688 2.34688 11.9328 2.4125C12.4797 2.08438 12.9008 1.56484 13.0977 0.946875C12.5863 1.25039 12.0203 1.47187 11.416 1.58945C10.932 1.07266 10.243 0.75 9.48283 0.75C8.01993 0.75 6.83595 1.93672 6.83595 3.39961C6.83595 3.60742 6.85782 3.80977 6.90431 4.00391C4.70314 3.89453 2.75079 2.83906 1.4465 1.23398C1.21954 1.625 1.08829 2.08164 1.08829 2.56562C1.08829 3.48437 1.55861 4.29648 2.26954 4.77227C1.83204 4.76133 1.42189 4.64102 1.06642 4.44141V4.47422C1.06642 5.75938 1.9797 6.82852 3.19103 7.07188C2.96954 7.13203 2.73439 7.16484 2.49376 7.16484C2.32423 7.16484 2.15743 7.14844 1.99611 7.11562C2.33243 8.16836 3.31134 8.93398 4.47072 8.95586C3.56564 9.6668 2.42267 10.0906 1.18126 10.0906C0.967981 10.0906 0.757434 10.077 0.549622 10.0523C1.7172 10.8125 3.109 11.25 4.60197 11.25C9.47736 11.25 12.1406 7.21133 12.1406 3.70859C12.1406 3.59375 12.1379 3.47891 12.1324 3.3668C12.6492 2.99219 13.0977 2.52734 13.4531 1.99414Z" fill="white"/>
                  </svg>
                </li>
                <li className="black-line__icon-item">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4.17751C4.99649 4.17751 4.17754 4.99645 4.17754 5.99997C4.17754 7.00348 4.99649 7.82243 6 7.82243C7.00352 7.82243 7.82247 7.00348 7.82247 5.99997C7.82247 4.99645 7.00352 4.17751 6 4.17751ZM11.466 5.99997C11.466 5.24528 11.4729 4.49743 11.4305 3.74411C11.3881 2.86911 11.1885 2.09254 10.5486 1.4527C9.90743 0.81149 9.13223 0.613248 8.25723 0.570866C7.50254 0.528483 6.75469 0.535319 6.00137 0.535319C5.24668 0.535319 4.49883 0.528483 3.74551 0.570866C2.87051 0.613248 2.09395 0.812858 1.45411 1.4527C0.812894 2.09391 0.614652 2.86911 0.572269 3.74411C0.529887 4.49879 0.536723 5.24665 0.536723 5.99997C0.536723 6.75329 0.529887 7.5025 0.572269 8.25583C0.614652 9.13083 0.814262 9.90739 1.45411 10.5472C2.09532 11.1884 2.87051 11.3867 3.74551 11.4291C4.5002 11.4714 5.24805 11.4646 6.00137 11.4646C6.75606 11.4646 7.50391 11.4714 8.25723 11.4291C9.13223 11.3867 9.90879 11.1871 10.5486 10.5472C11.1898 9.90602 11.3881 9.13083 11.4305 8.25583C11.4742 7.5025 11.466 6.75465 11.466 5.99997ZM6 8.80407C4.44825 8.80407 3.1959 7.55172 3.1959 5.99997C3.1959 4.44821 4.44825 3.19586 6 3.19586C7.55176 3.19586 8.80411 4.44821 8.80411 5.99997C8.80411 7.55172 7.55176 8.80407 6 8.80407ZM8.91895 3.7359C8.55665 3.7359 8.26407 3.44333 8.26407 3.08102C8.26407 2.71872 8.55665 2.42614 8.91895 2.42614C9.28125 2.42614 9.57383 2.71872 9.57383 3.08102C9.57394 3.16705 9.55708 3.25226 9.5242 3.33176C9.49133 3.41126 9.4431 3.4835 9.38226 3.54433C9.32143 3.60517 9.24919 3.6534 9.16969 3.68627C9.09019 3.71915 9.00498 3.73601 8.91895 3.7359Z" fill="white"/>
                  </svg>
                </li>
                <li className="black-line__icon-item">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.875C3.61758 0.875 0.875 3.61758 0.875 7C0.875 9.50742 2.38438 11.6621 4.5418 12.6109C4.52539 12.1844 4.53906 11.6703 4.64844 11.2055C4.76602 10.7078 5.43594 7.8668 5.43594 7.8668C5.43594 7.8668 5.23906 7.47578 5.23906 6.89883C5.23906 5.99101 5.76406 5.31289 6.42031 5.31289C6.97813 5.31289 7.24609 5.73125 7.24609 6.23164C7.24609 6.79219 6.88789 7.62891 6.70469 8.40547C6.55156 9.05625 7.03008 9.58398 7.67266 9.58398C8.83203 9.58398 9.61406 8.09375 9.61406 6.32734C9.61406 4.98477 8.70898 3.98125 7.06562 3.98125C5.20898 3.98125 4.04961 5.36758 4.04961 6.91523C4.04961 7.44844 4.2082 7.82578 4.4543 8.11562C4.56641 8.24961 4.58281 8.3043 4.5418 8.45742C4.51172 8.56953 4.44609 8.84023 4.41602 8.94961C4.375 9.10547 4.24922 9.16016 4.10977 9.10273C3.25391 8.75273 2.85469 7.81758 2.85469 6.76211C2.85469 5.02305 4.32305 2.93672 7.23242 2.93672C9.57031 2.93672 11.1098 4.6293 11.1098 6.44492C11.1098 8.84844 9.77266 10.6422 7.80391 10.6422C7.14219 10.6422 6.52148 10.284 6.3082 9.8793C6.3082 9.8793 5.95273 11.2902 5.87617 11.5637C5.74766 12.0367 5.49336 12.507 5.26094 12.8762C5.81055 13.0375 6.39297 13.1277 6.99727 13.1277C10.3797 13.1277 13.1223 10.3852 13.1223 7.00273C13.125 3.61758 10.3824 0.875 7 0.875Z" fill="white"/>
                  </svg>
                </li>
              </ul>
            </div>
          </section>
      </div>

      <section className="menu__wrap flex container">
        <div className="menu__logo">
          <Link to="/" className='header-nav-logo' data-test-id='header-logo-link'></Link>
        </div>
        <div className='menu' data-test-id='menu'>
          <ul className="menu__list flex list-reset">
            <li className="menu__item"><Link className="menu-item" to="/" data-test-id={`menu-link-about`}>About Us</Link></li>
            <li className="menu__item"><Link className="menu-item" to="women" data-test-id={`menu-link-women`}>Women</Link></li>
            <li className="menu__item"><Link className="menu-item" to="men" data-test-id={`menu-link-men`}>Men</Link></li>
            <li className="menu__item"><Link className="menu-item" to="/" data-test-id={`menu-link-beauty`}>Beauty</Link></li>
            <li className="menu__item"><Link className="menu-item" to="/" data-test-id={`menu-link-accessories`}>Accessories</Link></li>
            <li className="menu__item"><Link className="menu-item" to="/" data-test-id={`menu-link-blog`}>Blog</Link></li>
            <li className="menu__item"><Link className="menu-item" to="/" data-test-id={`menu-link-contact`}>Contact</Link></li>
          </ul>
        </div>
        <div className="menu__icon">
          <ul className="menu__icon-list flex list-reset">
            <li className="menu__icon-item">
              <Link to="/" className="menu__icon-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 19L13 13L19 19ZM15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </li>
            <li className="menu__icon-item">
              <Link to="/" className="menu__icon-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.055 9H3C3.53043 9 4.03914 9.21071 4.41421 9.58579C4.78929 9.96086 5 10.4696 5 11V12C5 12.5304 5.21071 13.0391 5.58579 13.4142C5.96086 13.7893 6.46957 14 7 14C7.53043 14 8.03914 14.2107 8.41421 14.5858C8.78929 14.9609 9 15.4696 9 16V18.945M6 1.935V3.5C6 4.16304 6.26339 4.79893 6.73223 5.26777C7.20107 5.73661 7.83696 6 8.5 6H9C9.53043 6 10.0391 6.21071 10.4142 6.58579C10.7893 6.96086 11 7.46957 11 8C11 8.53043 11.2107 9.03914 11.5858 9.41421C11.9609 9.78929 12.4696 10 13 10C13.5304 10 14.0391 9.78929 14.4142 9.41421C14.7893 9.03914 15 8.53043 15 8C15 7.46957 15.2107 6.96086 15.5858 6.58579C15.9609 6.21071 16.4696 6 17 6H18.064M13 18.488V16C13 15.4696 13.2107 14.9609 13.5858 14.5858C13.9609 14.2107 14.4696 14 15 14H18.064L13 18.488ZM19 10C19 11.1819 18.7672 12.3522 18.3149 13.4442C17.8626 14.5361 17.1997 15.5282 16.364 16.364C15.5282 17.1997 14.5361 17.8626 13.4442 18.3149C12.3522 18.7672 11.1819 19 10 19C8.8181 19 7.64778 18.7672 6.55585 18.3149C5.46392 17.8626 4.47177 17.1997 3.63604 16.364C2.80031 15.5282 2.13738 14.5361 1.68508 13.4442C1.23279 12.3522 1 11.1819 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </li>
            <li className="menu__icon-item">
              <Link to="/" className="menu__icon-link">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C12 6.06087 11.5786 7.07828 10.8284 7.82843C10.0783 8.57857 9.06087 9 8 9C6.93913 9 5.92172 8.57857 5.17157 7.82843C4.42143 7.07828 4 6.06087 4 5C4 3.93913 4.42143 2.92172 5.17157 2.17157C5.92172 1.42143 6.93913 1 8 1C9.06087 1 10.0783 1.42143 10.8284 2.17157C11.5786 2.92172 12 3.93913 12 5V5Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12C6.14348 12 4.36301 12.7375 3.05025 14.0503C1.7375 15.363 1 17.1435 1 19H15C15 17.1435 14.2625 15.363 12.9497 14.0503C11.637 12.7375 9.85652 12 8 12V12Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </li>
            <li className="menu__icon-item">
              <Link to="/" className="menu__icon-link">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9H13ZM2 7H16L17 19H1L2 7Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </Link>
            </li>
          </ul>
        </div>
        <span
          className={classNames('burger-menu-btn', { visible: isMenuOpen })}
          onClick={tooggleMenuMode} data-test-id='burger-menu-btn'>
        </span>
        
      </section>
      <div className={classNames('burger-menu__wrapp', { visible_menu: isMenuOpen })}
        onClick={tooggleMenuMode}></div>

      <div className={classNames('burger-menu', { visible_menu: isMenuOpen })}
        onClick={tooggleMenuMode}>
        <div className="burger-menu__block" data-test-id='burger-menu'> 
          <ul className="burger-menu__list flex list-reset">
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="/" data-test-id={`menu-link-about`}>About Us</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="women" data-test-id={`menu-link-women`}>Women</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="men" data-test-id={`menu-link-men`}>Men</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="/" data-test-id={`menu-link-beauty`}>Beauty</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="/" data-test-id={`menu-link-accessories`}>Accessories</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="/" data-test-id={`menu-link-blog`}>Blog</Link></li>
            <li className="burger-menu__item"><Link className="menu-item burger-item" to="/" data-test-id={`menu-link-contact`}>Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="grey-line"></div>
      </div>
    </header>
    </>

  )
}

export {Header}
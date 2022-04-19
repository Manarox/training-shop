import React from 'react';
import { useState } from "react";
import classNames from 'classnames';
import store from '../redux/Store';
import { ItemCart } from './ItemCart';
import { HightLight } from './HightLight';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import InputMask from "react-input-mask";

let cloneErrorsPostcode = ''

export const Basket = ({isBasketOpen, toggleBasket, tooggleBasketMode, checkBoxReset, setCheckBoxReset, tooggleBasketModeButton}) => {
    const dispatch = useDispatch();
    //Кнопка закрытия корзины, Очистка товаров
    function tooggleBasketResetAll() {
      dispatch({ type: 'RESET_ITEMS_IN_CART' })
      tooggleBasketModeReset()
    }
    //Кнопка перехода к товарам + очисткой данных
    function tooggleBasketModeViewCartError() {
      tooggleBasketModeViewCart()
      //Очищаем данные + в Форме
      formik.resetForm()
      setDeliveryformBtn(true)
      formik.values.checkboxPolic = false
      formik.values.country_store = ""
      formik.values.cardDate = ""
      formik.values.cardCVV = ""
      dispatch({ type: 'RESET_VALUES' })
    }

    //Кнопка закрытия корзины, С ОЧИСТКОЙ STATE
    function tooggleBasketModeReset() {
      toggleBasket(!isBasketOpen);
      document.body.style.overflow = 'hidden';
      if (!isBasketOpen === false) {
        document.body.style.overflow = 'inherit';
      }
      //Очищаем данные + в Форме
      formik.resetForm()
      setCheckBoxReset(false)
      setDeliveryformBtn(true)
      formik.values.checkboxPolic = false
      formik.values.country_store = ""
      formik.values.cardDate = ""
      formik.values.cardCVV = ""
      dispatch({ type: 'RESET_VALUES' })
    }
    //Кнопка VIEW CART
    function tooggleBasketModeViewCart() {
      if (typeButtonLoad === 'Item in Cart') {
        toggleBasket(!isBasketOpen);
        document.body.style.overflow = 'hidden';
        if (!isBasketOpen === false) {
          document.body.style.overflow = 'inherit';
        }
      } else if (typeButtonLoad === 'Delivery Info') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Item in Cart'})
      } else if (typeButtonLoad === 'Payment') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Delivery Info'})
        //Удаляем ошибки на форме оплаты при переходе на форму доставки
        formik.setFieldError('card')
        formik.setFieldError('cardDate')
        formik.setFieldError('cardCVV')
        formik.setFieldError('cashEmail')
      } else if (typeButtonLoad === 'Application') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      }
    }

    const productInCart = useSelector(state => state.basketReducer.basket)
    const totalPrice = +(productInCart.reduce((allPrice, post) => allPrice + +post.price, 0)).toFixed(2);

    //Выбор кнопки
    const { typeButtonLoad } = useSelector((state) => state.delivaryReducer);
    //Показ и очистка checkbox формы

    const handleAgree = () => {
      if (formik.isValid !== true) {
        formik.values.checkboxPolic = false
      }
      if (formik.isValid === true) {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      }
    }
    const handleSubmitBtn = () => {
      formik.handleSubmit()
    }
    //Проверяем какая кнопка выбрана и переходим на следующую
    const changeFurtherButton = (e) => {
      if (typeButtonLoad === 'Item in Cart') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Delivery Info'})
      } else if (typeButtonLoad === 'Delivery Info') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      } else if (typeButtonLoad === 'Payment') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Application'})
      } 
    };
    //ФОРМА ДОСТАВКИ
    //Выбор radio доставки
    const { typeDeliveryLoad } = useSelector((state) => state.delivaryReducer);
    const changeDeliveryChose = (e) => {
      dispatch({ type: 'CHANGE_TYPE_DELIVERY_CHOSE', payload: e})
      if (typeDeliveryLoad === "pickup from post offices") {
        if (formik.errors.postcode !== undefined) {
          cloneErrorsPostcode = formik.errors.postcode.slice();
          delete formik.errors['postcode']
        } 
      }
      if (typeDeliveryLoad === "express delivery") {
        if (cloneErrorsPostcode !== undefined) {
          formik.errors.postcode = cloneErrorsPostcode.slice();
        }
      }
      if ( e === "store pickup") {
        //Загрузка данных СТРАНЫ при выборе пункта
        dispatch({ type: 'LOADING_COUNTRY'})
        delete formik.errors['country']
        delete formik.errors['city']
        delete formik.errors['street']
        delete formik.errors['house']
        delete formik.errors['postcode']
      }
    };

    //Выбор radio оплаты
    const { typePaymentLoad } = useSelector((state) => state.delivaryReducer);
    const changePaymentChose = (e) => {
      dispatch({ type: 'CHANGE_TYPE_PAYMENT_CHOSE', payload: e})
    }
    //Преобразуем итоговый объект с товарами в корзине
    var resultBasket = productInCart.map(obj => ({name: obj.name, size: obj.size, color: obj.color, quantity: obj.counter}));

    //Formik доставки
    const initialValues = {
      totalPrice: totalPrice,
      products: resultBasket,
      deliveryMethod: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      street: "",
      house: "",
      postcode: "",
      apartment: "",
      country_store: "",
      storeAddress: "",
      card: "",
      cashEmail: "",
      paymentMethod: "",
      cardDate: "",
      cardCVV: "",
    }

    const formik = useFormik({
      initialValues,
    
      onSubmit: (values) => {
          formik.values.totalPrice = totalPrice
          formik.values.products = resultBasket
          formik.values.deliveryMethod = typeDeliveryLoad
          formik.values.paymentMethod = typePaymentLoad

          if (typeButtonLoad === 'Delivery Info') {
            //dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
            dispatch({ type: 'SEND_DELIVERY_FORM', payload: formik.values})
          }

          if (typeButtonLoad === 'Payment') {
            dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Application'})
            dispatch({ type: 'SEND_BASKET', payload: formik.values})
          }
      },
      
      validate: (values) => {
      let error = {};
  
      if (typeButtonLoad === 'Delivery Info') {

        if (!values.phone || values.phone === "+375 (__)_______") {
          error.phone = 'Поле должно быть заполнено';
        } else if (!/(\+375 \(25|29|33|44)\)(\s|)[0-9]{7}/.test(values.phone)) {
          error.phone = 'Исправте формат номера телефона';
        }

        if (!values.email) {
          error.email = 'Поле должно быть заполнено';
        } else if (!/^[A-Z0-9._%+-]+(@[A-Z0-9.-]{2,63})+\.[A-Z]{2,4}$/i.test(values.email)) {
          error.email = 'Исправте формат почты';
        }
        
        if (typeDeliveryLoad === 'pickup from post offices' || typeDeliveryLoad === 'express delivery') {

          if (!values.country) {
              error.country = 'Поле должно быть заполнено';
          }

          if (!values.city) {
              error.city = 'Поле должно быть заполнено';
          }

          if (!values.street) {
              error.street = 'Поле должно быть заполнено';
          }

          if (!values.house) {
              error.house = 'Поле должно быть заполнено';
          }

          if (typeDeliveryLoad === 'pickup from post offices') {
            if (!values.postcode || values.postcode === "BY ______") {
              error.postcode = 'Поле должно быть заполнено';
            } 
            const postcodeClear = values.postcode.split('_').join('');
            if (postcodeClear.length !== 9) {
              error.postcode = 'Исправте формат почтового кода';
            }
          }
        }

        if (!values.checkboxPolic) {
          error.checkboxPolic = 'Вы должны согласиться на обработку личной информации';
        }
        
        if (typeDeliveryLoad === 'store pickup') {
          if (!values.country_store || values.country_store === 'Country') {
            error.country_store = 'Поле должно быть заполнено';
          }
          let searchCountry = loadingCountry.find((post, i) => {
            if (post.name === values.country_store) {
                return true;
            } else {
                return false;
            }
          });
          if (searchCountry === undefined) {
            error.country_store = 'Вы должны выбрать страну из списка'
          }
          if (error.country_store !== undefined) {
            setDeliveryformBtn(true)
          }

          if (error.country_store === undefined) {
            if (values.storeAddress.length >= 3) {
              dispatch({ type: 'LOADING_STORE_ADDRESS', payload: {
                "city": values.storeAddress,
                "country": values.country_store
              }
              })
            }
            let searchStoreAddress = loadingStoreAddress.find((post, i) => {
                if (post.city === values.storeAddress) {
                    return true;
                } else {
                    return false;
                }
            });
            if (searchStoreAddress === undefined) {
              error.storeAddress = 'Вы должны выбрать страну из списка'
            }
            if (!values.storeAddress) {
              error.storeAddress = 'Введите 3 первых буквы города'
            }
            if (error.storeAddress !== undefined) {
              setDeliveryAdressBtn(true)
            }
          }
        }
      }
      if (typeButtonLoad === 'Payment') {
        if (typePaymentLoad === "visa" || typePaymentLoad === "mastercard") {
          if (!values.card) {
            error.card = 'Поле должно быть заполнено';
          } else if (!/(\d{4})( )(\d{4})( )(\d{4})( )(\d{4})/i.test(values.card)) {
            error.card = 'Проверьте правильность введенных данных';
          }

          if (!values.cardDate) {
            error.cardDate = 'Поле должно быть заполнено';
          } else if (!/(01|02|03|04|05|06|07|08|09|10|11|12)(\/)(\d{2})/i.test(values.cardDate)) {
            error.cardDate = 'Проверьте правильность введенных данных';
          } else {
            const monthCard = Number(values.cardDate.slice(0, 2));
            const monthToday = Number(new Date().toLocaleDateString().slice(3, 5));
            const yearCard = values.cardDate.slice(-2);
            const yearToday = new Date().toLocaleDateString().slice(-2);
            if (yearCard < yearToday) {
              error.cardDate = 'Ваша карта недействительна';
            }
            if (yearCard === yearToday && monthCard < monthToday) {
              error.cardDate = 'Ваша карта недействительна';
            }
          }

          if (!values.cardCVV) {
            error.cardCVV = 'Поле должно быть заполнено';
          } else if (values.cardCVV.length <= 2 || values.cardCVV.length >= 5) {
            error.cardCVV = 'Проверьте правильность введенных данных';
          }
        }

        if (typePaymentLoad === "paypal") {
          if (!values.cashEmail) {
            error.cashEmail = 'Поле должно быть заполнено';
          } else if (!/^[A-Z0-9._%+-]+(@[A-Z0-9.-]{2,63})+\.[A-Z]{2,4}$/i.test(values.cashEmail)) {
            error.cashEmail = 'Исправте формат почты';
          }
        }
      }
          
      return error;
      },
    });
    //Выводим СТРАНЫ на страницу + получение ответа сервера
    const { loadingCountry, loadingStoreAddress, loadingDataRequest } = useSelector((state) => state.delivaryReducer);

    //Функция получения и фильтрации storeAddress
    //Отображение кнопки открыть/закрыть на Страны
    const [deliveryformBtn, setDeliveryformBtn] = useState(true);
    const handleChangeOnFocusInput = (event) => {
      setDeliveryformBtn(true)
    }

    //костыль обновления value
    const [countryStoreVisible, setCountryStoreVisible] = useState(false);
    const handleChangeCountryStore = (e) => {
      formik.values.country_store = e.target.innerText
      setCountryStoreVisible(!countryStoreVisible)
      setDeliveryformBtn(false)
      formik.validateForm()
    }

    //Отображение адреса магазина
    const [deliveryAdressBtn, setDeliveryAdressBtn] = useState(false);
    const handleChangeAdressOnFocusInput = (event) => {
      setDeliveryAdressBtn(true)
    }
    //костыль обновления value для адреса
    const [adressStoreVisible, setAdressStoreVisible] = useState(false);
    const handleChangeAdressStore = (e) => {
      formik.values.storeAddress = e.target.id
      setAdressStoreVisible(!adressStoreVisible)
      setDeliveryAdressBtn(false)
      formik.validateForm()
    }

    const [passwordIcon, setPasswordIcon] = useState(false);
    const handleChangePassword = (e) => {
      setPasswordIcon(!passwordIcon)
    }
    //Получение обновленного loadingDataRequest
    const dataRequest = store.getState().delivaryReducer.loadingDataRequest
    return (
    <>
    <div className={classNames('basket__wrapp', { visible_basket_wrapp: isBasketOpen })} onClick={tooggleBasketMode}></div>

      <section className={classNames('basket', { visible_basket: isBasketOpen })}>
          <div className={classNames('basket__container', { visible_basket__container: isBasketOpen })} data-test-id="cart">
            <div className="basket__top">
              <div className="basket__top__one">
                <span className="basket__top__title">SHOPPING CART</span>
                
                {
                  dataRequest.message === "success"
                  ?
                  <button
                  className='basket__top__close'
                  onClick={tooggleBasketResetAll}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  :
                  null
                }

                {
                  dataRequest.message === "success"
                  ?
                  null
                  :
                  <button
                    className={classNames('basket__top__close', { display_none: (loadingDataRequest.message === 'success') })}
                    onClick={tooggleBasketModeReset}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                }

              </div>
                <div className={classNames('basket__top__two', { display_none: (typeButtonLoad === 'Application') })}>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (typeButtonLoad === 'Item in Cart') })}
                    id="Item in Cart"
                    
                  >
                    Item in Cart
                  </button>
                  <span className="basket__top_slash">/</span>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (typeButtonLoad === 'Delivery Info') })}
                    id="Delivery Info"
                  >
                    Delivery Info
                  </button>
                  <span className="basket__top_slash">/</span>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (typeButtonLoad === 'Payment') })}
                    id="Payment"
                  >
                    Payment
                  </button>
                </div>
            </div>

            {/* Вывод товаров */}
            {typeButtonLoad === 'Item in Cart' ?
              <div className="basket__products">
                  {
                    productInCart.length > 0
                    ?
                    productInCart.map((post, i) => (<ItemCart product={post} key={i} />))
                    :
                    <span className='empty__basket'>Sorry, your cart is empty</span>
                  }
              </div>
            : null
            }

            {/* Вывод доставка */}
            <div className={classNames('delivery', { delivery_activ: (typeButtonLoad === 'Delivery Info') })}>
              <span className="delivery__title">
                  Choose the method of delivery of the items
              </span>
              <ul className="delivery__chose-list list-reset">
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="pickup from post offices"
                          name="btn-delivery"
                          onClick={(e) => changeDeliveryChose(e.target.id)}
                          checked={typeDeliveryLoad === 'pickup from post offices' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="pickup from post offices">Pickup from post offices</label>
                  </li>
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="express delivery"
                          name="btn-delivery"
                          onClick={(e) => changeDeliveryChose(e.target.id)}
                          checked={typeDeliveryLoad === 'express delivery' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="express delivery">Express delivery</label>
                  </li>
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="store pickup"
                          name="btn-delivery"
                          onClick={(e) => changeDeliveryChose(e.target.id)}
                          checked={typeDeliveryLoad === 'store pickup' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="store pickup">Store pickup</label>
                  </li>
              </ul>

              <form id='delivery-form' autocomplete="off" className="deliveryform" name="form" onSubmit={formik.handleSubmit}>
                  <div className="deliveryform__name">
                      <span className="deliveryform__title">Phone</span>
                        <InputMask
                          mask="+375 (99)9999999"
                          maskChar="_"
                          className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.phone && formik.touched.phone)})}
                          id="phone"
                          type="text"
                          name="phone"
                          placeholder="+375 (__)_______"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span className="formik__error">
                          {
                            formik.errors.phone && formik.touched.phone
                            ? formik.errors.phone
                            : null
                          }
                        </span>
                  </div>

                  <div className="deliveryform__name">
                      <span className="deliveryform__title">E-mail</span>
                      <input
                          className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.email && formik.touched.email)})}
                          id="email"
                          type="text"
                          name="email"
                          placeholder="e-mail"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                      />
                      <span className="formik__error">
                        {
                          formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : null
                        }
                      </span>
                  </div>
                  {typeDeliveryLoad === 'pickup from post offices' || typeDeliveryLoad === 'express delivery' ?
                    <div>
                      <div className="deliveryform__name deliveryform__name_small">
                          <span class="deliveryform__title">Adress</span>
                          <input
                              className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.country && formik.touched.country)})}
                              id="country"
                              type="text"
                              name="country"
                              placeholder={typeDeliveryLoad === 'store pickup' ? "Country " : "Country"}
                              value={formik.values.country}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          <span className="formik__error">
                            {
                              formik.errors.country && formik.touched.country
                              ? formik.errors.country
                              : null
                            }
                          </span>
                      </div>

                      <div className="deliveryform__name deliveryform__name_small">
                          <input
                              className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.city && formik.touched.city)})}
                              id="city"
                              type="text"
                              name="city"
                              placeholder="City"
                              value={formik.values.city}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          <span className="formik__error">
                            {
                              formik.errors.city && formik.touched.city
                              ? formik.errors.city
                              : null
                            }
                          </span>
                      </div>

                      <div className="deliveryform__name deliveryform__name_small">
                          <input
                              className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.street && formik.touched.street)})}
                              id="street"
                              type="text"
                              name="street"
                              placeholder="Street"
                              value={formik.values.street}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                          <span className="formik__error">
                            {
                              formik.errors.street && formik.touched.street
                              ? formik.errors.street
                              : null
                            }
                          </span>
                      </div>

                      <div className="flex margin_bot">
                          <input
                              className={classNames('deliveryform__input deliveryform__input_small', { deliveryform__input_error: (formik.errors.house && formik.touched.house)})}
                              id="house"
                              type="text"
                              name="house"
                              placeholder="House"
                              value={formik.values.house}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          /> 

                          <input
                              className="deliveryform__input"
                              id="apartment"
                              type="text"
                              name="apartment"
                              placeholder="Apartment"
                              value={formik.values.apartment}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                          />
                      </div>
                      <span className="formik__error">
                        {
                          formik.errors.house && formik.touched.house
                          ? formik.errors.house
                          : null
                        }
                      </span>
                    </div>
                    :
                    null
                  }

                  {typeDeliveryLoad === 'store pickup' ?
                    <div>
                      <div className="deliveryform__name deliveryform__name_small">
                          <span class="deliveryform__title">Adress of store</span>

                          <div className="deliveryform_wrapp">
                            <div className='flex'>
                              <input
                                  autocomplete="off"
                                  className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.country_store && formik.touched.country_store)})}
                                  id="country_store"
                                  type="text"
                                  name="country_store"
                                  placeholder='Country'
                                  value={
                                    countryStoreVisible === true ? formik.values.country_store : formik.values.country_store                      
                                    }
                                  onChange={formik.handleChange}
                                  onFocus={(e) => handleChangeOnFocusInput(e)}
                                  onBlur={formik.handleBlur}
                              />
                              
                              <button className="deliveryform_btn" disabled={true}>
                                {
                                  deliveryformBtn === false
                                  ?
                                    null
                                  :
                                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M15.5 9L8 1.5L0.5 9" stroke="#9C9C9C" stroke-linecap="round"/>
                                    </svg>
                                }
                              </button>
                            </div>

                            <div className={classNames('deliveryform_block', { deliveryform_block_avtive: deliveryformBtn })}>
                              {typeDeliveryLoad === 'store pickup' ?
                                loadingCountry.map((post) => {
                                    return (
                                      <div className="deliveryform_option" value={post.name} id={post.id} onClick={(e) => handleChangeCountryStore(e)}>{post.name}</div>
                                    )
                                })
                                : null
                              }
                            </div> 
                          </div>
                          <span className="formik__error">
                            {
                              formik.errors.country_store && formik.touched.country_store
                              ? formik.errors.country_store
                              : null
                            }
                          </span>
                      </div>

                      <div className="deliveryform__name deliveryform__name_small">
                        <div className="deliveryform_wrapp">
                          <div className='flex'>
                            <input
                              autoComplete="new-storeAddress"
                              className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.storeAddress && formik.touched.storeAddress)})}
                              id="storeAddress"
                              type="text"
                              name="storeAddress"
                              placeholder="Street adress"
                              disabled={
                                formik.values.country_store === "" ?
                                true 
                                : (formik.errors.country_store === undefined ? false : true)
                                }
                              value={
                                adressStoreVisible === true ? formik.values.storeAddress : formik.values.storeAddress                      
                                }
                              onChange={formik.handleChange}
                              onFocus={(e) => handleChangeAdressOnFocusInput(e)}
                              onBlur={formik.handleBlur}
                            />

                            <button className="deliveryform_btn" disabled={true}>
                              {
                                deliveryAdressBtn === true ?
                                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.5 9L8 1.5L0.5 9" stroke="#9C9C9C" stroke-linecap="round"/>
                                </svg>
                                :
                                null
                              }
                            </button>
                          </div>
                        
                          <div id="searchAdress" className={classNames('deliveryform_block', { deliveryform_block_avtive: deliveryAdressBtn })}>
                            {loadingStoreAddress.length !== 0 ?
                              loadingStoreAddress.map((post) => {
                                  return (
                                    <div className="deliveryform_option" value={post.city} id={post.city} onClick={(e) => handleChangeAdressStore(e)}>
                                      <HightLight formikValues={formik.values.storeAddress} dataCity={post.city}/>
                                    </div>
                                  )
                              })
                              : null
                            }
                          </div>
                        </div>
                        <span className="formik__desc">
                          Введите город и выберите магазин из списка
                        </span>
                        <span className="formik__error">
                          {
                            formik.errors.storeAddress && formik.touched.storeAddress
                            ? formik.errors.storeAddress
                            : null
                          }
                        </span>
                      </div>
                    </div>
                  : null
                  }
                  {typeDeliveryLoad === 'pickup from post offices' ?
                    <div className="deliveryform__name deliveryform__name_postcode">
                      <span className="deliveryform__title">Postcode</span>
                      <InputMask
                        mask="BY 999999"
                        className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.postcode && formik.touched.postcode)})}
                        id="postcode"
                        type="text"
                        name="postcode"
                        placeholder="BY ______"
                        value={formik.values.postcode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="formik__error">
                        {
                          formik.errors.postcode && formik.touched.postcode
                          ? formik.errors.postcode
                          : null
                        }
                      </span>
                    </div>
                    : null
                  }
                  {checkBoxReset === true ?
                    <div>
                      <div className="deliveryform__checkbox">
                        <input
                          className='delivery__input-checkbox'
                          type="checkbox"
                          id="checkboxPolic"
                          name="checkboxPolic"
                          value={formik.values.checkboxPolic}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.checkboxPolic === true ? true : false}
                        />
                        <label
                          className={classNames('delivery__label-checkbox', { delivery__label_error: (formik.errors.checkboxPolic && formik.touched.checkboxPolic)})}
                          for="checkboxPolic"
                        >
                          I agree to the processing of my personal information
                        </label>
                      </div>
                      <span className="formik__error">
                        {
                          formik.errors.checkboxPolic && formik.touched.checkboxPolic
                          ? formik.errors.checkboxPolic
                          : null
                        }
                      </span>
                    </div>
                  : null
                  }
              </form>
            </div>

            {/* Вывод оплаты */}
            <div className={classNames('payment', { payment_activ: (typeButtonLoad === 'Payment') })}>
              <span className="delivery__title">
                Method of payments
              </span>
              <ul className="delivery__chose-list list-reset">
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="paypal"
                          name="btn"
                          onClick={(e) => changePaymentChose(e.target.id)}
                          checked={typePaymentLoad === 'paypal' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="paypal">
                        <img src={process.env.PUBLIC_URL + "/images/icon-paypal.png"} alt="paypal" />
                      </label>
                  </li>
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="visa"
                          name="btn"
                          onClick={(e) => changePaymentChose(e.target.id)}
                          checked={typePaymentLoad === 'visa' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="visa">
                        <img src={process.env.PUBLIC_URL + "/images/icon-visa.png"} alt="visa" />
                      </label>
                  </li>
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="mastercard"
                          name="btn"
                          onClick={(e) => changePaymentChose(e.target.id)}
                          checked={typePaymentLoad === 'mastercard' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="mastercard">
                        <img src={process.env.PUBLIC_URL + "/images/icon-mastercard.png"} alt="mastercard" />
                      </label>
                  </li>
                  <li className="delivery__item">
                      <input
                          className="delivery__input"
                          type="radio"
                          id="cash"
                          name="btn"
                          onClick={(e) => changePaymentChose(e.target.id)}
                          checked={typePaymentLoad === 'cash' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="cash">Cash</label>
                  </li>
              </ul>

              <form id='payment-form' className="deliveryform" name="form" onSubmit={formik.handleSubmit}>
                {/* Проверка на VISA */}
                {typePaymentLoad === 'visa' || typePaymentLoad === 'mastercard' ?
                  <div className="deliveryform__wrap">
                    <div className="deliveryform__name">
                        <span className="deliveryform__title">Card</span>
                        <InputMask
                            mask="9999 9999 9999 9999"
                            maskChar="_"
                            className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.card && formik.touched.card)})}
                            id="card"
                            type="text"
                            name="card"
                            placeholder="____ ____ ____ ____"
                            value={formik.values.card}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="formik__error">
                          {
                            formik.errors.card && formik.touched.card
                            ? formik.errors.card
                            : null
                          }
                        </span>
                    </div>

                    <div className="flex">
                      <div className="flex deliveryform__block">
                        <InputMask
                            mask="99/99"
                            maskChar="_"
                            className={classNames('deliveryform__input deliveryform__input_small', { deliveryform__input_error: (formik.errors.cardDate && formik.touched.cardDate)})}
                            id="cardDate"
                            type="text"
                            name="cardDate"
                            placeholder="MM/YY"
                            value={formik.values.cardDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        /> 
                        <span className="formik__error">
                          {
                            formik.errors.cardDate && formik.touched.cardDate
                            ? formik.errors.cardDate
                            : null
                          }
                        </span>
                      </div>
                      <div className="flex deliveryform__block password">
                        <InputMask
                            mask="9999"
                            maskChar=""
                            className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.cardCVV && formik.touched.cardCVV)})}
                            id="cardCVV"
                            type={
                              passwordIcon === false ? "password" : "text"                      
                            }
                            name="cardCVV"
                            placeholder="CVV"
                            value={formik.values.cardCVV}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                          passwordIcon === false ?
                          <button className="password-control" onClick={(e) => handleChangePassword(e)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.06336 12C2.65768 10.8958 3.79576 9.33029 5.40445 8.0117C7.12095 6.60473 9.34594 5.5 12 5.5C14.654 5.5 16.879 6.60473 18.5955 8.0117C20.2042 9.33029 21.3423 10.8958 21.9366 12C21.3423 13.1042 20.2042 14.6697 18.5955 15.9883C16.879 17.3953 14.654 18.5 12 18.5C9.34594 18.5 7.12095 17.3953 5.40445 15.9883C3.79576 14.6697 2.65768 13.1042 2.06336 12ZM1.04153 12.1996C1.04585 12.2095 1.0505 12.2193 1.05547 12.229C1.66882 13.4536 2.93553 15.2576 4.77052 16.7617C6.61236 18.2714 9.05403 19.5 12 19.5C14.9459 19.5 17.3876 18.2714 19.2295 16.7617C21.0645 15.2576 22.3312 13.4535 22.9445 12.2289C22.9496 12.2191 22.9544 12.209 22.9588 12.1988C22.9868 12.1343 23.0001 12.0667 23.0001 12C23.0001 11.9333 22.9868 11.8657 22.9588 11.8012C22.9544 11.791 22.9496 11.7809 22.9445 11.7711C22.3312 10.5465 21.0645 8.74242 19.2295 7.2383C17.3876 5.7286 14.9459 4.5 12 4.5C9.05403 4.5 6.61236 5.7286 4.77052 7.2383C2.93553 8.74239 1.66882 10.5464 1.05547 11.771C1.0505 11.7807 1.04585 11.7905 1.04153 11.8004C1.01327 11.8652 0.999826 11.9331 0.999878 12C0.999826 12.0669 1.01327 12.1348 1.04153 12.1996Z" fill="#9C9C9C"/>
                              <path d="M10.5835 8.80421C10.4707 8.54955 10.5851 8.24824 10.8519 8.16829C11.5189 7.96844 12.2296 7.94534 12.9132 8.10563C13.7612 8.30448 14.5211 8.77468 15.0775 9.44481C15.6339 10.1149 15.9563 10.9484 15.9959 11.8185C16.0277 12.5198 15.8744 13.2142 15.5553 13.833C15.4276 14.0806 15.1104 14.1377 14.8808 13.9799V13.9799C14.6513 13.8222 14.5975 13.5093 14.7146 13.2565C14.9151 12.8233 15.0101 12.346 14.9882 11.8642C14.9586 11.2136 14.7175 10.5903 14.3014 10.0892C13.8853 9.58807 13.317 9.23644 12.6829 9.08774C12.2134 8.97764 11.7268 8.98324 11.2641 9.10069C10.9941 9.16922 10.6964 9.05888 10.5835 8.80421V8.80421Z" fill="#9C9C9C"/>
                              <path d="M14.1491 14.7638C14.3183 14.9814 14.2803 15.2979 14.0435 15.4387C13.3088 15.8752 12.4492 16.0674 11.5905 15.979C10.5654 15.8735 9.62052 15.3764 8.9529 14.5914C8.28528 13.8063 7.9464 12.7939 8.0069 11.7652C8.05758 10.9034 8.38527 10.0858 8.93417 9.4308C9.11115 9.21961 9.42966 9.233 9.61719 9.43488V9.43488C9.80473 9.63677 9.7891 9.95038 9.62103 10.1687C9.25601 10.6429 9.03859 11.2188 9.00301 11.8238C8.9576 12.5959 9.21195 13.3557 9.71302 13.9449C10.2141 14.5341 10.9232 14.9072 11.6926 14.9864C12.2954 15.0484 12.8988 14.9263 13.4254 14.6422C13.6679 14.5114 13.98 14.5463 14.1491 14.7638V14.7638Z" fill="#9C9C9C"/>
                              <path d="M3.5 2.5L20 21.5" stroke="#9C9C9C" stroke-linecap="round"/>
                            </svg>
                          </button>
                          :
                          <button className="password-control" onClick={(e) => handleChangePassword(e)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.06336 12C2.65768 10.8958 3.79576 9.33029 5.40445 8.0117C7.12095 6.60473 9.34594 5.5 12 5.5C14.654 5.5 16.879 6.60473 18.5955 8.0117C20.2042 9.33029 21.3423 10.8958 21.9366 12C21.3423 13.1042 20.2042 14.6697 18.5955 15.9883C16.879 17.3953 14.654 18.5 12 18.5C9.34594 18.5 7.12095 17.3953 5.40445 15.9883C3.79576 14.6697 2.65768 13.1042 2.06336 12ZM1.04153 12.1996C1.04585 12.2095 1.0505 12.2193 1.05547 12.229C1.66882 13.4536 2.93553 15.2576 4.77052 16.7617C6.61236 18.2714 9.05403 19.5 12 19.5C14.9459 19.5 17.3876 18.2714 19.2295 16.7617C21.0645 15.2576 22.3312 13.4535 22.9445 12.2289C22.9496 12.2191 22.9544 12.209 22.9588 12.1988C22.9868 12.1343 23.0001 12.0667 23.0001 12C23.0001 11.9333 22.9868 11.8657 22.9588 11.8012C22.9544 11.791 22.9496 11.7809 22.9445 11.7711C22.3312 10.5465 21.0645 8.74242 19.2295 7.2383C17.3876 5.7286 14.9459 4.5 12 4.5C9.05403 4.5 6.61236 5.7286 4.77052 7.2383C2.93553 8.74239 1.66882 10.5464 1.05547 11.771C1.0505 11.7807 1.04585 11.7905 1.04153 11.8004C1.01327 11.8652 0.999826 11.9331 0.999878 12C0.999826 12.0669 1.01327 12.1348 1.04153 12.1996Z" fill="#121212"/>
                              <circle cx="12" cy="12" r="3.5" stroke="#121212"/>
                            </svg>
                          </button>
                        }
                        <span className="formik__error">
                          {
                            formik.errors.cardCVV && formik.touched.cardCVV
                            ? formik.errors.cardCVV
                            : null
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                : null
                }

                {typePaymentLoad === 'paypal' ?
                  <div className="deliveryform__name">
                    <span className="deliveryform__title">E-mail</span>
                    <input
                        className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.cashEmail && formik.touched.cashEmail)})}
                        id="cashEmail"
                        type="text"
                        name="cashEmail"
                        placeholder="e-mail"
                        value={formik.values.cashEmail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="formik__error">
                      {
                        formik.errors.cashEmail && formik.touched.cashEmail
                        ? formik.errors.cashEmail
                        : null
                      }
                    </span>
                  </div>
                : null
                }
              </form>
            </div>

            {/* Вывод заявки */}
            {
            typeButtonLoad === 'Application'
            ? 
              <div className="application">
                  {
                    dataRequest.message === "success"
                    ? 
                    <div className="application__wrapp">
                      <div className="application__title">
                        <span className="application__title_span">Thank you</span>
                        <span className="application__title_span">for your order</span>
                      </div>
                      <div className="application__desc">
                        Information about your order will appear in your e-mail.
                      </div>
                      <div className="application__desc">
                        Our manager will call you back.
                      </div>
                    </div>
                    :
                    null
                  }
                  {
                    dataRequest === "error" || dataRequest.message === "request-error" || dataRequest.message === "underfunded" || dataRequest.message === "bank-error" || dataRequest.message === "timeout"
                    ? 
                    <div className="application__wrapp">
                      <div className="application__title">
                        <span className="application__title_span">Sorry,</span>
                        <span className="application__title_span">your payment</span>
                        <span className="application__title_span">has not been</span>
                        <span className="application__title_span">processed.</span>
                      </div>
                      <div className="application__desc">
                        Failed to pay for the order: 
                      </div>
                      <div className="application__desc red">
                        Сообщение: {dataRequest.message}
                      </div>
                      <div className="application__desc red">
                        Описание: 
                      </div>
                      <div className="application__desc">
                        {dataRequest.unavailableCartValues !== undefined ?
                          dataRequest.unavailableCartValues.map((post) => {
                              return (
                                <div className='flex'>
                                  <div className="dataError__title">{post.name}: </div><div className="dataError__desc red">{post.value}</div>
                                </div>
                              )
                          })
                          : null
                        }
                      </div>
                    </div>
                  :
                  null
                }
              </div>
            :
              null
            }

            {/* Вывод НИЗ корзины */}
            <div className={classNames('basket__bottom', { display_none: (typeButtonLoad === 'Application') })}>
              {
              productInCart.length > 0 ?
              <>
              <div className='basket__bottom__info'>
                <span className="basket__bottom__total">Total</span>
                <span className="basket__bottom__price">$ {totalPrice}</span>
              </div>

              {
                typeButtonLoad === "Item in Cart" ?
                  <div className="basket__bottom__btns">
                    <button
                      className="basket__bottom__btn basket__bottom__btn_black"
                      onClick={(e) => changeFurtherButton(e)}
                    >
                      FURTHER
                    </button>
                  </div>
                :
                null
              }

              {
                typeButtonLoad === "Delivery Info" ?
                  <div className="basket__bottom__btns">
                    <button
                      className="basket__bottom__btn basket__bottom__btn_black"
                      type="submit"
                      onClick={handleAgree}
                      form='delivery-form'
                    >
                      FURTHER
                    </button>
                  </div>
                :
                null
              }

              {
                typeButtonLoad === "Payment" ?
                  <div className="basket__bottom__btns">
                    <button
                      className="basket__bottom__btn basket__bottom__btn_black"
                      type="submit"
                      onClick={handleSubmitBtn}
                      form='payment-form'
                    >
                      {typePaymentLoad === "cash" ? "READY" : "CHECK OUT"}

                    </button>
                  </div>
                :
                null
              }
              
              {
                dataRequest.message === "success" || dataRequest.message === "request-error" || dataRequest.message === "underfunded" || dataRequest.message === "bank-error" || dataRequest.message === "timeout" || dataRequest === "error"
                ?
                null
                :
                <div className="basket__bottom__btns">
                  <button
                    className="basket__bottom__btn basket__bottom__btn_white"
                    onClick={tooggleBasketModeViewCart}
                  >
                    VIEW CART
                  </button>
                </div>
              }
              </>
              :
              <>
              <div className="basket__bottom__btns">
                <button className="basket__bottom__btn basket__bottom__btn_black" onClick={tooggleBasketMode}>BACK TO SHOPPING</button>
              </div>
              </>
              }
            </div>

            {/* Вывод кнопок на форме заявки */}

            {
            typeButtonLoad === 'Application'
            ?
            <div className="basket__bottom_application">
              {
                dataRequest.message === "success"
                ?
                <div className='basket__bottom__btns'>
                  <button
                    className="basket__bottom__btn basket__bottom__btn_black"
                    onClick={tooggleBasketResetAll}
                  >
                    BACK TO SHOPPING
                  </button>
                </div>
                :
                null
              }
              {
                dataRequest.message !== "success"
                ?
                <div>
                  <div className='basket__bottom__btns'>
                    <button
                      className="basket__bottom__btn basket__bottom__btn_black"
                      onClick={tooggleBasketModeViewCart}
                    >
                      BACK TO PAYMENT
                    </button>
                  </div>

                  <div className='basket__bottom__btns'>
                    <button
                      className="basket__bottom__btn basket__bottom__btn_white"
                      onClick={tooggleBasketModeViewCartError}
                    >
                      VIEW CART
                    </button>
                  </div>
                </div>
                :
                null
              }

            </div>
            :
              null
            }

          </div>
      </section>
    </>

  )
}
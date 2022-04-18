import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import classNames from 'classnames';
import store from '../redux/Store';
import { ItemCart } from '../components/ItemCart';
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Error from '../components/Error';
//import Delivery from '../components/Delivery';
//import Payment from '../components/Payment';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
//import * as Yup from 'yup';
import InputMask from "react-input-mask";


let cloneErrorsPostcode = ''
 
const Header = () => {
    const dispatch = useDispatch();

    const [isMenuOpen, toggleMenu] = useState(false);
    function tooggleMenuMode() {
        toggleMenu(!isMenuOpen);
        document.body.style.overflow = 'hidden';
        //num++;
        // if (num%2 === 0) {
        //   document.body.style.overflow = 'inherit';
        // }
        if (!isMenuOpen === false) {
          document.body.style.overflow = 'inherit';
        }
    }
    //
    const [isBasketOpen, toggleBasket] = useState(false);
    function tooggleBasketMode() {
        toggleBasket(!isBasketOpen);
        document.body.style.overflow = 'hidden';
        if (!isBasketOpen === false) {
          document.body.style.overflow = 'inherit';
        }
    }
    function tooggleBasketModeButton() {
      toggleBasket(!isBasketOpen);
      setCheckBoxReset(true)
      document.body.style.overflow = 'hidden';
      if (!isBasketOpen === false) {
        document.body.style.overflow = 'inherit';
      }
    }

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
      //setCheckBoxReset(false)
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
      if (isTypeButtonLoad === 'Item in Cart') {
        toggleBasket(!isBasketOpen);
        document.body.style.overflow = 'hidden';
        if (!isBasketOpen === false) {
          document.body.style.overflow = 'inherit';
        }
      } else if (isTypeButtonLoad === 'Delivery Info') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Item in Cart'})
      } else if (isTypeButtonLoad === 'Payment') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Delivery Info'})
        //Удаляем ошибки на форме оплаты при переходе на форму доставки
        delete formik.errors['card']
        delete formik.errors['cardDate']
        delete formik.errors['cardCVV']
        delete formik.errors['cashEmail']
      } else if (isTypeButtonLoad === 'Application') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      }
      console.log(formik)
    }


    const productInCart = useSelector(state => state.basketReducer.basket)
    //const productInCart = useSelector(state => state.basket) было без combineReducers
    const totalPrice = +(productInCart.reduce((allPrice, post) => allPrice + +post.price, 0)).toFixed(2);

    //console.log(productInCart)

    const { isError } = useSelector((state) => state.loadReducer);

    //Выбор кнопки
    const { isTypeButtonLoad } = useSelector((state) => state.delivaryReducer);

    //Показ и очистка checkbox формы
    const [checkBoxReset, setCheckBoxReset] = useState(true);
    //const [agree, setAgree] = useState(false);
    //const [errorCheckbox, setErrorCheckbox] = useState(false);
    // const handleSetAgree = () => {
    //   // )
    //   setAgree(!agree);
    //   // if (agree === false) {
    //   //   formik.errors.checkboxPolic = null;
    //   // }
    //   //formik.errors = null
    //   formik.validateForm()
    //   // console.log(agree)
    // };
    const handleAgree = () => {
      console.log(formik.errors)
      console.log(formik)
      
      if (formik.isValid !== true) {
        formik.values.checkboxPolic = false
      }
      if (formik.isValid === true) {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      }
    }
    const handleSubmitBtn = () => {
      console.log(formik)
      formik.handleSubmit()
    }
    //Проверяем какая кнопка выбрана и переходим на следующую
    const changeFurtherButton = (e) => {
      if (isTypeButtonLoad === 'Item in Cart') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Delivery Info'})
      } else if (isTypeButtonLoad === 'Delivery Info') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
      } else if (isTypeButtonLoad === 'Payment') {
        dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Application'})
      } 
    };
    //
    //ФОРМА ДОСТАВКИ
    //Выбор radio доставки
    const { isTypeDeliveryLoad } = useSelector((state) => state.delivaryReducer);

    const changeDeliveryChose = (e) => {
      dispatch({ type: 'CHANGE_TYPE_DELIVERY_CHOSE', payload: e})

      if (isTypeDeliveryLoad === "pickup from post offices") {
        if (formik.errors.postcode !== undefined) {
          cloneErrorsPostcode = formik.errors.postcode.slice();
          delete formik.errors['postcode']
        } 
      }

      if (isTypeDeliveryLoad === "express delivery") {
        if (cloneErrorsPostcode !== undefined) {
          formik.errors.postcode = cloneErrorsPostcode.slice();
        }
        //cloneExpress = Object.assign({}, formik.errors);
      }

    
      if ( e === "store pickup") {
        //Загрузка данных СТРАНЫ при воборе пункта
        dispatch({ type: 'LOADING_COUNTRY'})

        delete formik.errors['country']
        delete formik.errors['city']
        delete formik.errors['street']
        delete formik.errors['house']
        delete formik.errors['postcode']
      }
    };

    //Выбор radio оплаты
    const { isTypePaymentLoad } = useSelector((state) => state.delivaryReducer);

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
          formik.values.deliveryMethod = isTypeDeliveryLoad
          formik.values.paymentMethod = isTypePaymentLoad

          if (isTypeButtonLoad === 'Delivery Info') {
            dispatch({ type: 'SEND_DELIVERY_FORM', payload: formik.values})
          }

          if (isTypeButtonLoad === 'Payment') {
            dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Application'})
            //dispatch({ type: 'SEND_PAYMENT_FORM', payload: formik.values})
            dispatch({ type: 'SEND_BASKET', payload: formik.values})
          }
          
          
      },
      // validationSchema: Yup.object().shape({
      //   phone: Yup
      //   .string()
      //   .required('Поле должно быть заполнено2')
      //   .matches(phoneRegExp, "Неправильный номер"),
      // }),
      
      validate: (values) => {
      console.log(formik)
      let error = {};
  
      //Валидация для Доставки
      if (isTypeButtonLoad === 'Delivery Info') {
        //Валидация phone
        //const phoneRegExp = /(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        if (!values.phone || values.phone === "+375 (__)_______") {
          error.phone = 'Поле должно быть заполнено';
          //(!/^(?:\+375)\s?\(?29|25|44|33\)?\s?\d\d(?:\d[\s]\d\d[\s]\d\d|[\s]\d\d[\s]\d\d\d|\d{5})$/i.test(values.phone))
        } else if (!/(\+375 \(25|29|33|44)\)(\s|)[0-9]{7}/.test(values.phone)) {
          error.phone = 'Исправте формат номера телефона';
        }

        //console.log(formik.values.phone)
        //Валидация mail
        if (!values.email) {
          error.email = 'Поле должно быть заполнено';
        } else if (!/^[A-Z0-9._%+-]+(@[A-Z0-9.-]{2,63})+\.[A-Z]{2,4}$/i.test(values.email)) {
          error.email = 'Исправте формат почты';
        }
        
        if (isTypeDeliveryLoad === 'pickup from post offices' || isTypeDeliveryLoad === 'express delivery') {
          //Валидация country
          if (!values.country) {
              error.country = 'Поле должно быть заполнено';
          }
          //Валидация city
          if (!values.city) {
              error.city = 'Поле должно быть заполнено';
          }
          //Валидация street
          if (!values.street) {
              error.street = 'Поле должно быть заполнено';
          }
          //Валидация house
          if (!values.house) {
              error.house = 'Поле должно быть заполнено';
          }
          //Валидация postcode
          if (isTypeDeliveryLoad === 'pickup from post offices') {
            if (!values.postcode || values.postcode === "BY ______") {
              error.postcode = 'Поле должно быть заполнено';
            } 
            let str = values.postcode.split('_').join('');
            if (str.length !== 9) {
              error.postcode = 'Исправте формат почтового кода';
            }
          }
        }


        //Валидация checkboxPolic
        if (!values.checkboxPolic) {
          error.checkboxPolic = 'Вы должны согласиться на обработку личной информации';
          //setErrorCheckbox(true)
        }
        
        //Валидация country_store
        if (isTypeDeliveryLoad === 'store pickup') {
          if (!values.country_store || values.country_store === 'Country') {
            error.country_store = 'Поле должно быть заполнено';
            //setErrorCheckbox(true)
          }
          let searchCountry = isLoadingCountry.find((post, i) => {
            if (post.name === values.country_store) {
                return true; // stop searching
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
          //Валидация и запрос данных на storeAddress
          if (error.country_store === undefined) {
            if (values.storeAddress.length >= 3) {
              dispatch({ type: 'LOADING_STORE_ADDRESS', payload: {
                "city": values.storeAddress,
                "country": values.country_store
              }
              })
            }
            let searchStoreAddress = isLoadingStoreAddress.find((post, i) => {
              if (post.city === values.storeAddress) {
                  return true; // stop searching
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
          }
        }
      }



      //Валидация для Оплаты
      if (isTypeButtonLoad === 'Payment') {
        if (isTypePaymentLoad === "visa" || isTypePaymentLoad === "mastercard") {
          if (!values.card) {
            error.card = 'Поле должно быть заполнено';
          } else if (!/(\d{4})( )(\d{4})( )(\d{4})( )(\d{4})/i.test(values.card)) {
            //(!/^4[0-9]{12}(?:[0-9]{3})?$/i.test(values.card))
            error.card = 'Проверьте правильность введенных данных';
          }
          //Валидация cardDate
          if (!values.cardDate) {
            error.cardDate = 'Поле должно быть заполнено';
          } else if (!/(01|02|03|04|05|06|07|08|09|10|11|12)(\/)(\d{2})/i.test(values.cardDate)) {
            //(!/^4[0-9]{12}(?:[0-9]{3})?$/i.test(values.card))
            //(\d{2})(\/)(\d{2})
            error.cardDate = 'Проверьте правильность введенных данных';
          } else {
            let monthCard = Number(values.cardDate.slice(0, 2));
            let monthToday = Number(new Date().toLocaleDateString().slice(3, 5));
            let yearCard = values.cardDate.slice(-2);
            let yearToday = new Date().toLocaleDateString().slice(-2);
            if (yearCard < yearToday) {
              error.cardDate = 'Ваша карта недействительна';
            }
            if (yearCard === yearToday && monthCard < monthToday) {
              error.cardDate = 'Ваша карта недействительна';
            }
          }
          //Валидация cardCVV
          if (!values.cardCVV) {
            error.cardCVV = 'Поле должно быть заполнено';
          } else if (values.cardCVV.length <= 2 || values.cardCVV.length >= 5) {
            error.cardCVV = 'Проверьте правильность введенных данных';
          }
        }
        // Валидация cashEmail
        if (isTypePaymentLoad === "paypal") {
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
    const { isLoadingCountry, isLoadingStoreAddress, isDataRequest } = useSelector((state) => state.delivaryReducer);

    //Функция получения и фильтрации storeAddress
    //отображение кнопки открыть закрыть на Страны
    const [deliveryformBtn, setDeliveryformBtn] = useState(true);
    //const [deliveryformInputNotError, setdeliveryformInputNotError] = useState(false);
    const handleChangeBtn = (e) => {
      setDeliveryformBtn(!deliveryformBtn)
    }
    const handleChangeOnFocusInput = (event) => {
      setDeliveryformBtn(true)
      if (formik.errors.country_store === undefined) {
        //setdeliveryformInputNotError(false)
        console.log("В поле нету ошибок")
      }
    }

    //костыль обновления value
    const [countryStoreVisible, setCountryStoreVisible] = useState(false);
    const handleChangeCountryStore = (e) => {
      formik.values.country_store = e.target.innerText
      setCountryStoreVisible(!countryStoreVisible)

      setDeliveryformBtn(false)
      formik.validateForm()
      //delete formik.errors['country_store']
    }

    const [passwordIcon, setPasswordIcon] = useState(false);
    const handleChangePassword = (e) => {
      setPasswordIcon(!passwordIcon)
    }

    //Получение обновленного isDataRequest
    const dataRequest = store.getState().delivaryReducer.isDataRequest
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
              <li className="menu__icon-item menu__icon-item_relative">
                {productInCart.length > 0 ? <span className="basket-btn__kol">{productInCart.length}</span> : null}

                <button type="button" className={classNames('button-cart', { visible: isBasketOpen })} onClick={tooggleBasketModeButton} data-test-id='cart-button'>

                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 9V5C13 3.93913 12.5786 2.92172 11.8284 2.17157C11.0783 1.42143 10.0609 1 9 1C7.93913 1 6.92172 1.42143 6.17157 2.17157C5.42143 2.92172 5 3.93913 5 5V9H13ZM2 7H16L17 19H1L2 7Z" stroke="#121212" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </button>
              </li>
            </ul>
          </div>

          <button type="button" className={classNames('burger-menu-btn_b', { visible: isMenuOpen })}
            onClick={tooggleMenuMode} data-test-id='burger-menu-btn'>
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
          </button>
        </section>
        <div className={classNames('burger-menu__wrapp', { visible_menu: isMenuOpen })}
          onClick={tooggleMenuMode}></div>

        <div className={classNames('burger-menu', { visible_menu: isMenuOpen })} onClick={tooggleMenuMode}>
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

    {isError ? <Error /> : null}

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
                    className={classNames('basket__top__close', { display_none: (isDataRequest.message === 'success') })}
                    onClick={tooggleBasketModeReset}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                }

                {/* <button className="basket__top__close" onClick={tooggleBasketModeReset}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1L1 13Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button> */}


              </div>
                <div className={classNames('basket__top__two', { display_none: (isTypeButtonLoad === 'Application') })}>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (isTypeButtonLoad === 'Item in Cart') })}
                    id="Item in Cart"
                    
                  >
                    Item in Cart
                  </button>
                  <span className="basket__top_slash">/</span>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (isTypeButtonLoad === 'Delivery Info') })}
                    id="Delivery Info"
                  >
                    Delivery Info
                  </button>
                  <span className="basket__top_slash">/</span>
                  <button
                    className={classNames('basket__top_btn', { basket__top_btn_activ: (isTypeButtonLoad === 'Payment') })}
                    id="Payment"
                  >
                    Payment
                  </button>
                </div>
            </div>

            {/* Вывод товаров */}
            {isTypeButtonLoad === 'Item in Cart' ?
              <div className="basket__products">
                  {
                  productInCart.length > 0 ?
                  productInCart.map((post, i) => (<ItemCart product={post} key={i} />))
                  : <span className='empty__basket'>Sorry, your cart is empty</span>
                  }
              </div>
            : null
            }

            {/* Вывод доставка */}
            
            <div className={classNames('delivery', { delivery_activ: (isTypeButtonLoad === 'Delivery Info') })}>
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
                          checked={isTypeDeliveryLoad === 'pickup from post offices' ? 'checked' : null}
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
                          checked={isTypeDeliveryLoad === 'express delivery' ? 'checked' : null}
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
                          checked={isTypeDeliveryLoad === 'store pickup' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="store pickup">Store pickup</label>
                  </li>
              </ul>

              <form id='delivery-form' autocomplete="off" className="deliveryform" name="form" onSubmit={formik.handleSubmit}>

                  <div className="deliveryform__name">
                      <span class="deliveryform__title">Phone</span>
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
                      <span class="deliveryform__title">E-mail</span>
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
                  {isTypeDeliveryLoad === 'pickup from post offices' || isTypeDeliveryLoad === 'express delivery' ?
                    <div>
                      <div className="deliveryform__name deliveryform__name_small">
                          <span class="deliveryform__title">Adress</span>
                          <input
                              className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.country && formik.touched.country)})}
                              id="country"
                              type="text"
                              name="country"
                              placeholder={isTypeDeliveryLoad === 'store pickup' ? "Country " : "Country"}
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

                  {isTypeDeliveryLoad === 'store pickup' ?
                  <div>
                    <div className="deliveryform__name deliveryform__name_small">
                        <span class="deliveryform__title">Adress of store</span>

                        <div className="deliveryform_wrapp">
                          <div className='flex'>
                            <input
                                //list="country_store2"
                                autocomplete="off"
                                className={classNames('deliveryform__input', { deliveryform__input_error: (formik.errors.country_store && formik.touched.country_store)})}
                                id="country_store"
                                type="text"
                                name="country_store"
                                placeholder='Country'
                                
                                //value={formik.values.country_store}
                                value={
                                  countryStoreVisible === true ? formik.values.country_store : formik.values.country_store                      
                                  }
                                onChange={formik.handleChange}
                                //onClick={(event) => handleChangeOnFocusInput(event)}
                                onFocus={(e) => handleChangeOnFocusInput(e)}
                                //onBlur={(event) => handleChangeBtn(event)}
                                onBlur={formik.handleBlur}
                            />
                            
                            <button className="deliveryform_btn" onClick={(e) => handleChangeBtn(e)}>
                              {
                                deliveryformBtn === false ?
                                <svg className="arrow_rotate" width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.5 9L8 1.5L0.5 9" stroke="#9C9C9C" stroke-linecap="round"/>
                                </svg>
                                :
                                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.5 9L8 1.5L0.5 9" stroke="#9C9C9C" stroke-linecap="round"/>
                                </svg>
                              }
                            </button>
                          </div>

                          <div className={classNames('deliveryform_block', { deliveryform_block_avtive: deliveryformBtn })}>
                            {isTypeDeliveryLoad === 'store pickup' ?
                              isLoadingCountry.map((post) => {
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
                        <input
                          autoComplete="new-storeAddress"
                          list="storeAddressDatalist"
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
                          value={formik.values.storeAddress}
                          onChange={formik.handleChange}
                          //onChange={(e) => handleChangeStoreAddress(e.target.value)}
                          onBlur={formik.handleBlur}
                        />
                        <datalist id="storeAddressDatalist">
                          {isLoadingStoreAddress.length !== 0 ?
                            isLoadingStoreAddress.map((post) => {
                                return (
                                  <option className="deliveryform_option" value={post.city} id={post.city}>{post.city}</option>
                                )
                            })
                            : null
                          }               
                        </datalist>
                        <span className="formik__desc">Введите город и выберите магазин из списка</span>
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

                  {isTypeDeliveryLoad === 'pickup from post offices' ?
                      <div className="deliveryform__name deliveryform__name_postcode">
                          <span class="deliveryform__title">Postcode</span>
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
                        //checked={Object.keys(formik.errors).length !== 0 ? false : true}
                        //{agree === true ? checked : null}
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
            <div className={classNames('payment', { payment_activ: (isTypeButtonLoad === 'Payment') })}>
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
                          checked={isTypePaymentLoad === 'paypal' ? 'checked' : null}
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
                          checked={isTypePaymentLoad === 'visa' ? 'checked' : null}
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
                          checked={isTypePaymentLoad === 'mastercard' ? 'checked' : null}
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
                          checked={isTypePaymentLoad === 'cash' ? 'checked' : null}
                      />
                      <label className="delivery__label" for="cash">Cash</label>
                  </li>
              </ul>

              <form id='payment-form' className="deliveryform" name="form" onSubmit={formik.handleSubmit}>
                {/* Проверка на VISA */}
                {isTypePaymentLoad === 'visa' || isTypePaymentLoad === 'mastercard' ?
                  <div className="deliveryform__wrap">
                    <div className="deliveryform__name">
                        <span class="deliveryform__title">Card</span>
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

                {isTypePaymentLoad === 'paypal' ?
                  <div className="deliveryform__name">
                    <span class="deliveryform__title">E-mail</span>
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
            isTypeButtonLoad === 'Application'
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

            <div className={classNames('basket__bottom', { display_none: (isTypeButtonLoad === 'Application') })}>
              {
              productInCart.length > 0 ?
              <>
              <div className='basket__bottom__info'>
                <span className="basket__bottom__total">Total</span>
                <span className="basket__bottom__price">$ {totalPrice}</span>
              </div>

              {
                isTypeButtonLoad === "Item in Cart" ?
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
                isTypeButtonLoad === "Delivery Info" ?
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
                isTypeButtonLoad === "Payment" ?
                  <div className="basket__bottom__btns">
                    <button
                      className="basket__bottom__btn basket__bottom__btn_black"
                      type="submit"
                      onClick={handleSubmitBtn}
                      form='payment-form'
                    >
                      {isTypePaymentLoad === "cash" ? "READY" : "CHECK OUT"}

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
            isTypeButtonLoad === 'Application'
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

export {Header}
// import React from 'react';
// import classNames from 'classnames';
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useFormik } from 'formik';

// const Delivery = (props) => {
// //Выбор способа доставки
// const dispatch = useDispatch();

// const { isTypeDeliveryLoad } = useSelector((state) => state.delivaryReducer);

// console.log(isTypeDeliveryLoad)
// const changeDeliveryChose = (e) => {
//     dispatch({ type: 'CHANGE_TYPE_DELIVERY_CHOSE', payload: e})
// };

// const initialValues = {
//     phone: "",
//     mail: "",
// }

// const formik = useFormik({
//     initialValues,
  
//     onSubmit: (values) => {
//         dispatch({ type: 'CHANGE_TYPE_BUTTON', payload: 'Payment'})
//     },
//     validate: (values) => {
//     let error = {};

//     //Валидация phone
//     if (!values.phone) {
//         error.phone = 'Введите телефон';
//     }

//     //Валидация mail
//     if (!values.mail) {
//     error.mail = 'Введите почту';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail))
//     error.mail = 'Исправте формат почты';

//     //Валидация adress
//     if (!values.adress) {
//         error.adress = 'Введите адрес';
//     }

//     //Валидация city
//     if (!values.city) {
//         error.city = 'Введите город';
//     }

//     //Валидация street
//     if (!values.street) {
//         error.street = 'Введите улицу';
//     }

//     //Валидация house
//     if (!values.house) {
//         error.house = 'Введите номер дома';
//     }
       
//     return error;
//     },
//   });

// const {changeFurtherButton, productInCart, totalPrice, tooggleBasketModeViewCart, tooggleBasketMode, isTypeButtonLoad} = props;
// //console.log(totalPrice)
//     //
//     return (
//       <>

        
//       </>
//     );
//   };
  
//   export default Delivery;
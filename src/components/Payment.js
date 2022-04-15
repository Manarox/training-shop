import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from 'formik';

const Payment = (props) => {
  //formikPayment оплаты
  const initialValues = {
    card: "",
    cardDate: "",
    cardCVV: "",
    cashEmail: "",
  }
  const formik = useFormik({
    initialValues,
  
    onSubmit: (values) => {

    },
    validate: (values) => {
    let error = {};

    //Валидация cashEmail
    // if (!values.cashEmail) {
    // error.cashEmail = 'Введите почту';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cashEmail))
    // error.cashEmail = 'Исправте формат почты';

    //Валидация card
    if (!values.card) {
        error.card = 'Введите данные карты';
    }
    //Валидация cardDate
    if (!values.cardDate) {
        error.cardDate = 'Введите срок службы карты';
    }
    //Валидация cardCVV
    if (!values.cardCVV) {
      error.cardCVV = 'Введите код';
    }

    return error;
    },
  });
  return (
    <>
    
    </>
  )
};

export default Payment;
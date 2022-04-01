import axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';
//import { call, put, takeEvery } from 'redux-saga/effects';
//import { useSelector } from "react-redux";

console.log('emailSaga')
export const SEND_EMAIL_SAGA = 'SEND_EMAIL_SAGA'

// function* sendEmail() {
//   const payload1 = {
//     id: "620126dda5293589353a9c75",
//     name: "Жора",
//     text: "jjjjjjjjjjjjjjjjjjjjjj",
//     rating: 3
//   }
//   try {
//     console.log('emailSaga')
//     const email = yield call(axios.post, 'https://training.cleverland.by/shop/product/review', payload1);
//     //axios.post('https://training.cleverland.by/shop/product/review', payload1)
//     //console.log(email.data)
//     //yield put({ type: 'SEND_SUCCESS_EMAIL', payload: email });
//     yield put({ type: 'SEND_SUCCESS_EMAIL' });
//   } catch (e) {
//     yield put({ type: 'SEND_ERROR_EMAIL', payload: e });
//   }
// }



function* sendEmailSub(action) {

  const data = {
    mail: action.payload,
  }
  try {
    console.log('emailSaga')
    const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
    //axios.post('https://training.cleverland.by/shop/product/review', payload1)
    console.log(email)
    //yield put({ type: 'SEND_SUCCESS_EMAIL', payload: email });
    yield put({ type: 'SEND_EMAIL_SUCCESS' });
  } catch (e) {
    yield put({ type: 'SEND_EMAIL__ERROR', payload: e });
  }
}

function* sendEmailSubFooter(action) {

  const data = {
    mail: action.payload,
  }
  try {
    console.log('emailSaga')
    const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
    //axios.post('https://training.cleverland.by/shop/product/review', payload1)
    console.log(email)
    //yield put({ type: 'SEND_SUCCESS_EMAIL', payload: email });
    yield put({ type: 'FOOTER_SEND_EMAIL_SUCCESS' });
  } catch (e) {
    yield put({ type: 'FOOTER_SEND_EMAIL__ERROR', payload: e });
  }
}

export default function* emailSaga() {
    yield all([takeLatest('SEND_EMAIL_SAGA', sendEmailSub)]);
    yield all([takeLatest('FOOTER_SEND_EMAIL_SAGA', sendEmailSubFooter)]);
    //yield takeEvery(SEND_EMAIL_SAGA, sendEmail)
  }
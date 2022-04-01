import axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';
//import { call, put, takeEvery } from 'redux-saga/effects';
//import { useSelector } from "react-redux";

console.log('emailSaga')
export const SEND_EMAIL_SAGA = 'SEND_EMAIL_SAGA' 




function* sendReview(action) {
    const data = action.payload
  try {
    console.log('emailSaga')
    const dataProd = yield call(axios.post, 'https://training.cleverland.by/shop/product/review', data);
    //axios.post('https://training.cleverland.by/shop/product/review', payload1)
    console.log(dataProd)
    //yield put({ type: 'SEND_SUCCESS_EMAIL', payload: email });
    yield put({ type: 'SEND_REVIEW_SUCCESS', payload: dataProd.data });
    //yield put({ type: 'SEND_REVIEW_SUCCESS'});
  } catch (e) {
    yield put({ type: 'SEND_REVIEW_ERROR', payload: e });
  }
}

export default function* emailSaga() {
    yield all([takeLatest('SEND_REVIEW_SAGA', sendReview)]);
    //yield takeEvery(SEND_EMAIL_SAGA, sendEmail)
  }
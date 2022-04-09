import axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';

export const SEND_EMAIL_SAGA = 'SEND_EMAIL_SAGA' 

function* sendReview(action) {
    const data = action.payload
  try {
    const dataProd = yield call(axios.post, 'https://training.cleverland.by/shop/product/review', data);
    yield put({ type: 'SEND_REVIEW_SUCCESS', payload: dataProd.data });
  } catch (e) {
    yield put({ type: 'SEND_REVIEW_ERROR', payload: e });
  }
}

export default function* emailSaga() {
    yield all([takeLatest('SEND_REVIEW_SAGA', sendReview)]);
  }
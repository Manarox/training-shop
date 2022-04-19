import axios from 'axios';
import { call, put, all, takeLatest } from 'redux-saga/effects';

export const SEND_EMAIL_SAGA = 'SEND_EMAIL_SAGA'

function* sendEmailSub(action) {
  const data = {
    mail: action.payload,
  }
  try {
    const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
    yield put({ type: 'SEND_EMAIL_SUCCESS', payload: email });
  } catch (e) {
    yield put({ type: 'SEND_EMAIL__ERROR', payload: e });
  }
}

function* sendEmailSubFooter(action) {
  const data = {
    mail: action.payload,
  }
  try {
    const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
    yield put({ type: 'FOOTER_SEND_EMAIL_SUCCESS', payload: email });
  } catch (e) {
    yield put({ type: 'FOOTER_SEND_EMAIL__ERROR', payload: e });
  }
}

export default function* emailSaga() {
    yield all([takeLatest('SEND_EMAIL_SAGA', sendEmailSub)]);
    yield all([takeLatest('FOOTER_SEND_EMAIL_SAGA', sendEmailSubFooter)]);
  }
//import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

// function* sendEmailSub(action) {
//   const data = {
//     mail: action.payload,
//   }
//   try {
//     const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
//     yield put({ type: 'SEND_EMAIL_SUCCESS', payload: email });
//   } catch (e) {
//     yield put({ type: 'SEND_EMAIL__ERROR', payload: e });
//   }
// }

// function* sendEmailSubFooter(action) {
//   const data = {
//     mail: action.payload,
//   }
//   try {
//     const email = yield call(axios.post, 'https://training.cleverland.by/shop/email', data);
//     yield put({ type: 'FOOTER_SEND_EMAIL_SUCCESS', payload: email });
//   } catch (e) {
//     yield put({ type: 'FOOTER_SEND_EMAIL__ERROR', payload: e });
//   }
// }
export const LOADING_COUNTRY = 'LOADING_COUNTRY'
  function* loadingCountry() {
    try {
      const request = yield call(fetch, 'https://training.cleverland.by/shop/countries');
      const data = yield call([request, request.json]);
      yield put({ type: 'LOAD_COUNTRY_SUCCESS', payload: data });

    } catch (e) {
      yield put({ type: 'LOAD_COUNTRY_ERROR' });
    }
  }     

  export default function* delivarySaga() {
      yield takeEvery(LOADING_COUNTRY, loadingCountry)
      //yield all([takeLatest('FOOTER_SEND_EMAIL_SAGA', sendEmailSubFooter)]);
    }
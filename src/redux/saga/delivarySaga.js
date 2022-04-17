import axios from 'axios';
import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';

export const LOADING_COUNTRY = 'LOADING_COUNTRY'

console.log('delivarySaga')

function* loadingCountry() {
  try {
    const request = yield call(fetch, 'https://training.cleverland.by/shop/countries');
    const data = yield call([request, request.json]);
    yield put({ type: 'LOAD_COUNTRY_SUCCESS', payload: data });

  } catch (e) {
    yield put({ type: 'LOAD_COUNTRY_ERROR' });
  }
}

function* loadingStoreAddress(action) {
  const data = action.payload
  try {
    const dataProd = yield call(axios.post, 'https://training.cleverland.by/shop/search/cities', data);
    yield put({ type: 'LOAD_STORE_ADDRESS_SUCCESS', payload: dataProd.data });
  } catch (e) {
    yield put({ type: 'LOAD_STORE_ADDRESS_ERROR', payload: e });
  }
}

function* loadingBasket(action) {
  //const data = action.payload
  //ПРОВЕРКА
  let resultData = Object.assign({}, action.payload)
  //Формирование paymentMethod isTypePaymentLoad
  if (resultData.paymentMethod === "mastercard" || resultData.paymentMethod === "visa") {
    resultData.paymentMethod = "card"
  } 
  //Удаление из Phone лишних символов
  resultData.phone = resultData.phone.split(' ').join('')
  resultData.phone = resultData.phone.split('(').join('')
  resultData.phone = resultData.phone.split(')').join('')
  //Удаление лишнего из Postcode
  resultData.postcode = resultData.postcode.split('BY ').join('')
  //Замена Country на store Country
  if (resultData.deliveryMethod === "store pickup") {
      resultData.country = resultData.country_store
      delete resultData['country_store']
  }
  delete resultData['country_store']
  //Удаление checkboxPolic
  delete resultData['checkboxPolic']
  //
  try {
    const dataRequest = yield call(axios.post, 'https://training.cleverland.by/shop/cart', resultData);
    yield put({ type: 'LOAD_BASKET_SUCCESS', payload: dataRequest.data });
  } catch (e) {
    yield put({ type: 'LOAD_BASKET_ERROR' });
  }
}



export default function* delivarySaga() {
    yield takeEvery(LOADING_COUNTRY, loadingCountry)
    yield all([takeLatest('LOADING_STORE_ADDRESS', loadingStoreAddress)]);
    yield all([takeLatest('SEND_BASKET', loadingBasket)]);
    //yield all([takeLatest('FOOTER_SEND_EMAIL_SAGA', sendEmailSubFooter)]);
  }
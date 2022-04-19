import { call, put, takeEvery } from 'redux-saga/effects';

export const LOAD = 'LOAD'
export const LOADPROD = 'LOADPROD'

function* newFunction() {
  try {
    const request = yield call(fetch, 'https://training.cleverland.by/shop/products');
    const data = yield call([request, request.json]);
    yield put({ type: 'LOAD_DATA_SUCCESS', payload: data });

  } catch (e) {
    yield put({ type: 'LOAD_DATA_ERROR' });
  }
}

export default function* rootSaga() {
  yield takeEvery(LOADPROD, newFunction)
}
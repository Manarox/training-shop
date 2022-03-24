import { call, put, takeEvery } from 'redux-saga/effects';

//console.log('sd')

function* loadProducts() {
  const request = yield call(fetch, 'https://training.cleverland.by/shop/products');
  const data = yield call([request, request.json]);
  //console.log(data)
  return data;
}

export function* loadData() {
  yield put({ type: 'LOAD_DATA' });
}

export function* loadDataSuccess() {
  const data = yield loadProducts();
  yield put({ type: 'LOAD_DATA_SUCCESS', payload: data });
}
export function* loadDataError() {
  yield put({ type: 'LOAD_DATA_ERROR' });
}

// export default function* rootSaga() {
//   yield loadData();

//   try {
//     yield loadDataSuccess();
//   } catch (e) {
//     yield loadDataError(e);
//   }
//   }

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
  // yield takeEvery(LOAD, loadData)
  yield takeEvery(LOADPROD, newFunction)
}

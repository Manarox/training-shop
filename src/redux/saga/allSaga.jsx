import { all } from 'redux-saga/effects';
import rootSaga from '.';
import emailSaga from './emailSaga';
import reviewSaga from './reviewSaga';
import delivarySaga from './delivarySaga';

export default function* allSagas() {
  yield all([rootSaga(), emailSaga(), reviewSaga(), delivarySaga()]);
}
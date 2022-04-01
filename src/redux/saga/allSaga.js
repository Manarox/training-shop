import { all } from 'redux-saga/effects';
import rootSaga from '.';
import emailSaga from './emailSaga';
import reviewSaga from './reviewSaga';

console.log('allSaga')

export default function* allSagas() {
  yield all([rootSaga(), emailSaga(), reviewSaga()]);
}
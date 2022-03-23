import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import loadReducer from './loadReducer';
// import data from './data';

const rootReducer = combineReducers({
  basketReducer,
  loadReducer,
});

export default rootReducer;
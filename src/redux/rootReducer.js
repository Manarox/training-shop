import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import loadReducer from './loadReducer';
import emailReducer from './emailReducer';
import reviewReducer from './reviewReducer';
// import data from './data';

const rootReducer = combineReducers({
  basketReducer,
  loadReducer,
  emailReducer,
  reviewReducer,
});

export default rootReducer;
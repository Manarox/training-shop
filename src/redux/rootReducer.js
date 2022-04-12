import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import loadReducer from './loadReducer';
import emailReducer from './emailReducer';
import reviewReducer from './reviewReducer';
import delivaryReducer from './delivaryReducer';

const rootReducer = combineReducers({
  basketReducer,
  loadReducer,
  emailReducer,
  reviewReducer,
  delivaryReducer,
});

export default rootReducer;
import { compose, applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import rootSaga from './saga';

//import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const composeEnhancers = composeWithDevTools({});

  
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));


console.log(store.getState())
sagaMiddleware.run(rootSaga);

export default store;
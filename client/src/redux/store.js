import {createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist'; // package allows to persist site with localstorage and redux
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// At this point we are replacing thunk with Sagas
/* redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure 
  things like accessing the browser cache) easier to manage, more efficient to execute, simple to test, and better at handling 
  failures.
  
  Also I think of it as an organized way of helping your Redux app communicate and stay in-sync with the outside 
  world — mainly external APIs.*/
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Only use logger in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor};
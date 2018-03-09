import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import appReducer from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldCatchErrors: true }) : compose
const sagaMiddleware = createSagaMiddleware()
const middleware = [
  sagaMiddleware,
]

const initialState = {}

const store = createStore(appReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
sagaMiddleware.run(rootSaga)

export default store

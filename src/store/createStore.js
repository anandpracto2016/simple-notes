import { applyMiddleware, compose, createStore } from 'redux'
import createThunk                          from 'redux-thunk-catch';
import { createLogger }                     from 'redux-logger';
import makeRootReducer                      from './reducers';

import {initialState as dashboard}       from '../modules/dashboard/ducks/dashboard';

const __DEV__ = process.env.NODE_ENV !== "production";
const logger = createLogger({
  collapsed: true,
  duration: true
});

const reportError = (err, state, action, dispatch) => {
  console.log('[[ Thunk Error ]] ', err);
  
};
const thunk = createThunk(reportError);

let initial_state = {
  dashboard
}

export default (initialState = initial_state) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // const middleware = [thunk, fieldValidator]
  const middleware = __DEV__ ?
    [
      require('redux-immutable-state-invariant').default()
      ,thunk
      ,logger
    ] :
    [
      thunk
    ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__ || true) {
    // var bugReporterStoreEnhancer = require('redux-bug-reporter').storeEnhancer;
    const composeWithDevToolsExtension = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
    // enhancers.push(bugReporterStoreEnhancer);
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

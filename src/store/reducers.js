import { combineReducers } from 'redux';

import dashboardReducer from '../modules/dashboard/ducks/dashboard';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    dashboard: dashboardReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

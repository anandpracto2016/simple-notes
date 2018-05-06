import React                from 'react';
import {render}             from 'react-dom';
import { Provider }         from 'react-redux';
import createStore          from './store/createStore';
import createOnNavigationHandler, { createRouterWithContext } from './routes';
import history              from './helpers/history';
import qs                   from 'qs';

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore();
const router = createRouterWithContext(store);

// ========================================================
// window variables & functions
// ========================================================
window.userId = 1;
// =========================================================

let renderApp = (store, Component) => {
  try {
    render(
      (
        <Provider store={store}>
          <Component />
        </Provider>
      ),
      document.getElementById('mainContainer'),
      function() {
        console.log('called callback at client render...');
      }
    );
  } catch(e){
    console.log("Error while rendering: ", e)
  }
}

let renderErrorPage = (err) => {
  try {
    render(
      (
        <div>
          <h1>There was some error on this page</h1>
          {err.toString()}
        </div>
      ),
      document.getElementById('mainContainer'),
      function() {
        console.log('called callback at error render...');
      }
    );
  } catch(e){
    console.log("Error while rendering: ", e)
  }
}

const onNavigation = createOnNavigationHandler(router)(renderApp, renderErrorPage);
history.listen(location => onNavigation(location.pathname, qs.parse(location.search, {ignoreQueryPrefix: true })))
onNavigation(history.location.pathname, qs.parse(history.location.search, {ignoreQueryPrefix: true }));

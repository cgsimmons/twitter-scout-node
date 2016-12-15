import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes/>
  </Provider>,
  document.getElementById('main')
);

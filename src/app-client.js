import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
// import { createStore } from 'redux';
// import ReduxThunk from 'redux-thunk';
// import reducers from './reducers';
//
// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};

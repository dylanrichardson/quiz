import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './index';
import { composeWithDevTools } from 'redux-devtools-extension';

export default () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(reduxThunk)));

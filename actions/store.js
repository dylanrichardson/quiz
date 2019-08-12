import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as actionCreators from '@actions';
import createQuiz from './create';
import getQuiz from './get';
import leaveQuiz from './leave';

const reducers = combineReducers({
  createQuiz,
  getQuiz,
  leaveQuiz
});

export default () =>
  createStore(
    reducers,
    composeWithDevTools({ actionCreators, trace: true })(
      applyMiddleware(reduxThunk)
    )
  );

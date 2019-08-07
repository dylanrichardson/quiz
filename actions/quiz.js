import Router from 'next/router';
import {
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE
} from './types';
import client from '../utils/feathers';

const quiz = client.service('quiz');

export const createQuiz = () => async dispatch => {
  dispatch({ type: CREATE_QUIZ_REQUEST });

  try {
    const { id } = await quiz.create({});

    Router.push(`/${id}`);

    dispatch({
      type: CREATE_QUIZ_SUCCESS,
      payload: { data: { pin: id } }
    });
  } catch (error) {
    if (error.type === 'FeathersError') {
      return dispatch({
        type: CREATE_QUIZ_FAILURE,
        payload: { error: error.message }
      });
    }

    dispatch({
      type: CREATE_QUIZ_FAILURE,
      payload: { error: 'An error occurred.' }
    });
  }
};

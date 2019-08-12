import { client } from '@utils';

export const GET_QUIZ_REQUEST = 'GET_QUIZ_REQUEST';
export const GET_QUIZ_SUCCESS = 'GET_QUIZ_SUCCESS';
export const GET_QUIZ_FAILURE = 'GET_QUIZ_FAILURE';
export const GET_QUIZ_RESET = 'GET_QUIZ_RESET';

const quiz = client.service('quiz');

export const getQuiz = pin => async dispatch => {
  dispatch({ type: GET_QUIZ_REQUEST });

  try {
    const data = await quiz.get(pin);

    dispatch({
      type: GET_QUIZ_SUCCESS,
      payload: { data }
    });
  } catch (error) {
    if (error.type === 'FeathersError' && error.code === 404) {
      return dispatch({
        type: GET_QUIZ_FAILURE,
        payload: { error: 'Quiz not found.' }
      });
    }

    console.error(error);

    dispatch({
      type: GET_QUIZ_FAILURE,
      payload: { error: 'An error occurred.' }
    });
  }
};

export const resetGetQuiz = () => dispatch => {
  dispatch({ type: GET_QUIZ_RESET });
};

const initState = {
  isGetting: false,
  data: null,
  error: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case GET_QUIZ_REQUEST:
      return {
        ...state,
        isGetting: true,
        data: null,
        error: null
      };

    case GET_QUIZ_SUCCESS:
      return {
        ...state,
        isGetting: false,
        data: payload.data,
        error: null
      };

    case GET_QUIZ_FAILURE:
      return {
        ...state,
        isGetting: false,
        data: null,
        error: payload.error
      };

    case GET_QUIZ_RESET:
      return initState;

    default:
      return state;
  }
};

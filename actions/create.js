import { client } from '@utils';

export const CREATE_QUIZ_REQUEST = 'CREATE_QUIZ_REQUEST';
export const CREATE_QUIZ_SUCCESS = 'CREATE_QUIZ_SUCCESS';
export const CREATE_QUIZ_FAILURE = 'CREATE_QUIZ_FAILURE';
export const CREATE_QUIZ_RESET = 'CREATE_QUIZ_RESET';

const quiz = client.service('quiz');

export const createQuiz = () => async dispatch => {
  dispatch({ type: CREATE_QUIZ_REQUEST });

  try {
    const data = await quiz.create({});

    dispatch({
      type: CREATE_QUIZ_SUCCESS,
      payload: { data }
    });
  } catch (error) {
    if (error.type === 'FeathersError') {
      return dispatch({
        type: CREATE_QUIZ_FAILURE,
        payload: { error: error.message }
      });
    }

    console.error(error);

    dispatch({
      type: CREATE_QUIZ_FAILURE,
      payload: { error: 'An error occurred.' }
    });
  }
};

export const resetCreateQuiz = () => dispatch => {
  dispatch({ type: CREATE_QUIZ_RESET });
};

const initState = {
  isCreating: false,
  data: null,
  error: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case CREATE_QUIZ_REQUEST:
      return {
        ...state,
        isCreating: true,
        data: null,
        error: null
      };

    case CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        isCreating: false,
        data: payload.data,
        error: null
      };

    case CREATE_QUIZ_FAILURE:
      return {
        ...state,
        isCreating: false,
        data: null,
        error: payload.error
      };

    case CREATE_QUIZ_RESET:
      return initState;

    default:
      return state;
  }
};

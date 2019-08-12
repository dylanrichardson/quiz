import { client } from '@utils';

export const LEAVE_QUIZ_REQUEST = 'LEAVE_QUIZ_REQUEST';
export const LEAVE_QUIZ_SUCCESS = 'LEAVE_QUIZ_SUCCESS';
export const LEAVE_QUIZ_FAILURE = 'LEAVE_QUIZ_FAILURE';
export const LEAVE_QUIZ_RESET = 'LEAVE_QUIZ_RESET';

const quiz = client.service('quiz');

export const leaveQuiz = pin => async dispatch => {
  dispatch({ type: LEAVE_QUIZ_REQUEST });

  try {
    const data = await quiz.patch(pin, { operation: 'leave' });

    dispatch({
      type: LEAVE_QUIZ_SUCCESS,
      payload: { data }
    });
  } catch (error) {
    if (error.type === 'FeathersError' && error.code === 404) {
      return dispatch({
        type: LEAVE_QUIZ_FAILURE,
        payload: { error: 'Quiz not found.' }
      });
    }

    console.error(error);

    dispatch({
      type: LEAVE_QUIZ_FAILURE,
      payload: { error: 'An error occurred.' }
    });
  }
};

export const resetLeaveQuiz = () => dispatch => {
  dispatch({ type: LEAVE_QUIZ_RESET });
};

const initState = {
  isLeaving: false,
  data: null,
  error: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case LEAVE_QUIZ_REQUEST:
      return {
        ...state,
        isLeaving: true,
        data: null,
        error: null
      };

    case LEAVE_QUIZ_SUCCESS:
      return {
        ...state,
        isLeaving: false,
        data: payload.data,
        error: null
      };

    case LEAVE_QUIZ_FAILURE:
      return {
        ...state,
        isLeaving: false,
        data: null,
        error: payload.error
      };

    case LEAVE_QUIZ_RESET:
      return initState;

    default:
      return state;
  }
};

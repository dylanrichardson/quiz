import {
  CREATE_QUIZ_REQUEST,
  CREATE_QUIZ_SUCCESS,
  CREATE_QUIZ_FAILURE
} from '../actions/types';

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
        isCreating: true,
        data: null,
        error: payload.error
      };

    default:
      return state;
  }
};

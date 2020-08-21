import * as types from '../constants/PageActionTypes';

const initialPageState = {
  data: '',
  error: false
}
export const page = (state = initialPageState, action) => {
  switch (action.type) {
    case types.GET_DATA: {
      return {
        ...state,
        data: action.payload
      }
    }
    case types.GET_DATA_ERROR:
      return {
        ...state,
        data: action.payload,
        error: true
      }
    default:
      return state
  }
}

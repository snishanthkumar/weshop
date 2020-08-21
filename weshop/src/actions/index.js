import * as pageTypes from '../constants/PageActionTypes'
import axios from "axios";

const serverUrl = "http://localhost:6028";

axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getData() {
  return function (dispatch) {
    axios.get(serverUrl + '/api/getData')
      .then((response) => {

        dispatch({
          type: pageTypes.GET_DATA,
          payload: response.data.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: pageTypes.GET_DATA_ERROR,
          payload: err
        })
      })
  }
}
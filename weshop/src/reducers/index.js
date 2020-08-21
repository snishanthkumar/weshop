import { combineReducers } from 'redux';
import { page } from './page';

const rootReducer = combineReducers({
  page: page
})

export default rootReducer

import { combineReducers } from 'redux-immutable';
import user from './user';
import runtime from './runtime';
import brands from './brands';

export default combineReducers({
  user,
  runtime,
  brands,
});

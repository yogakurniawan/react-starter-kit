import { combineReducers } from 'redux';
import global from './global';
import device from './device';
import brand from './brand';

export default combineReducers({
  global,
  device,
  brand,
});

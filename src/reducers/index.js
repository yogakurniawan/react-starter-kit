import { combineReducers } from 'redux-immutable';
import global from './global';
import category from './category';
import wallpaper from './wallpaper';

export default combineReducers({
  global,
  wallpaper,
  category,
});

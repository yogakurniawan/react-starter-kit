import { fromJS } from 'immutable';

import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  SET_TOTAL_WALLPAPER,
  SET_PAGE,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: false,
  error: null,
  payload: {
    wallpapers: [],
    page: 0,
    total: 0,
  },
});

function wallpaper(state = initialState, action) {
  const { page, payload, error } = action;
  switch (action.type) {
    case SET_PAGE:
      return state
        .setIn(['payload', 'page'], page);
    case SET_TOTAL_WALLPAPER:
      return state
        .setIn(['payload', 'total'], payload.total);
    case LOAD_WALLPAPERS:
      return state
        .set('loading', true)
        .set('error', null)
        .setIn(['payload', 'wallpapers'], []);
    case LOAD_WALLPAPERS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .setIn(['payload', 'wallpapers'], payload.wallpapers);
    case LOAD_WALLPAPERS_ERROR:
      return state
        .set('error', error)
        .set('loading', false)
        .setIn(['payload', 'wallpapers'], []);
    default:
      return state;
  }
}

export default wallpaper;

import { fromJS } from 'immutable';

import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  SET_PAGE,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: false,
  error: null,
  payload: {
    wallpapers: null,
    page: 0,
  },
});

function wallpaper(state = initialState, action) {
  const { page, payload, error } = action;
  switch (action.type) {
    case SET_PAGE:
      return state
        .setIn(['payload', 'page'], page);
    case LOAD_WALLPAPERS:
      return state
        .set('loading', true)
        .set('error', null)
        .setIn(['payload', 'wallpapers'], null);
    case LOAD_WALLPAPERS_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .setIn(['payload', 'wallpapers'], payload.wallpapers);
    case LOAD_WALLPAPERS_ERROR:
      return state
        .set('error', error)
        .set('loading', false)
        .setIn(['payload', 'wallpapers'], null);
    default:
      return state;
  }
}

export default wallpaper;


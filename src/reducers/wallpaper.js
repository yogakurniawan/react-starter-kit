import { fromJS } from 'immutable';

import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  LOAD_WALLPAPER,
  LOAD_WALLPAPER_SUCCESS,
  LOAD_WALLPAPER_ERROR,
  GET_TOTAL_WALLPAPER,
  GET_TOTAL_WALLPAPER_SUCCESS,
  GET_TOTAL_WALLPAPER_ERROR,
  SET_TOTAL_WALLPAPER,
  SET_PAGE,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: {
    loadWallpapers: false,
    loadWallpaper: false,
    getTotalWallpaper: false,
  },
  error: {
    loadWallpapers: null,
    loadWallpaper: null,
    getTotalWallpaper: null,
  },
  payload: {
    wallpapers: [],
    wallpaper: null,
    page: 0,
    total: 0,
  },
});

function wallpaper(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case SET_PAGE:
      return state
        .setIn(['payload', 'page'], payload);
    case SET_TOTAL_WALLPAPER:
      return state
        .setIn(['payload', 'total'], payload);
    case LOAD_WALLPAPER:
      return state
        .setIn(['loading', 'loadWallpaper'], true)
        .setIn(['error', 'loadWallpaper'], null)
        .setIn(['payload', 'wallpaper'], null);
    case LOAD_WALLPAPER_SUCCESS:
      return state
        .setIn(['loading', 'loadWallpaper'], false)
        .setIn(['error', 'loadWallpaper'], null)
        .setIn(['payload', 'wallpaper'], payload);
    case LOAD_WALLPAPER_ERROR:
      return state
        .setIn(['error', 'loadWallpaper'], error)
        .setIn(['loading', 'loadWallpaper'], false)
        .setIn(['payload', 'wallpaper'], null);
    case LOAD_WALLPAPERS:
      return state
        .setIn(['loading', 'loadWallpapers'], true)
        .setIn(['error', 'loadWallpapers'], null)
        .setIn(['payload', 'wallpapers'], []);
    case LOAD_WALLPAPERS_SUCCESS:
      return state
        .setIn(['loading', 'loadWallpapers'], false)
        .setIn(['error', 'loadWallpapers'], null)
        .setIn(['payload', 'wallpapers'], payload);
    case LOAD_WALLPAPERS_ERROR:
      return state
        .setIn(['error', 'loadWallpapers'], error)
        .setIn(['loading', 'loadWallpapers'], false)
        .setIn(['payload', 'wallpapers'], []);
    case GET_TOTAL_WALLPAPER:
      return state
        .setIn(['loading', 'getTotalWallpaper'], true)
        .setIn(['error', 'getTotalWallpaper'], null)
        .setIn(['payload', 'total'], 0);
    case GET_TOTAL_WALLPAPER_SUCCESS:
      return state
        .setIn(['loading', 'getTotalWallpaper'], false)
        .setIn(['error', 'getTotalWallpaper'], null)
        .setIn(['payload', 'total'], payload.count);
    case GET_TOTAL_WALLPAPER_ERROR:
      return state
        .setIn(['error', 'getTotalWallpaper'], error)
        .setIn(['loading', 'getTotalWallpaper'], false)
        .setIn(['payload', 'total'], 0);
    default:
      return state;
  }
}

export default wallpaper;

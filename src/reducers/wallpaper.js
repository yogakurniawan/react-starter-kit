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
        .setIn(['loadWallpaper', 'loading'], true)
        .setIn(['loadWallpaper', 'error'], null)
        .setIn(['payload', 'wallpaper'], null);
    case LOAD_WALLPAPER_SUCCESS:
      return state
        .setIn(['loadWallpaper', 'loading'], false)
        .setIn(['loadWallpaper', 'error'], null)
        .setIn(['payload', 'wallpaper'], payload);
    case LOAD_WALLPAPER_ERROR:
      return state
        .setIn(['loadWallpaper', 'error'], error)
        .setIn(['loadWallpaper', 'loading'], false)
        .setIn(['payload', 'wallpaper'], null);
    case LOAD_WALLPAPERS:
      return state
        .setIn(['loadWallpapers', 'loading'], true)
        .setIn(['loadWallpapers', 'error'], null)
        .setIn(['payload', 'wallpapers'], []);
    case LOAD_WALLPAPERS_SUCCESS:
      return state
        .setIn(['loadWallpapers', 'loading'], false)
        .setIn(['loadWallpapers', 'error'], null)
        .setIn(['payload', 'wallpapers'], payload);
    case LOAD_WALLPAPERS_ERROR:
      return state
        .setIn(['loadWallpapers', 'error'], error)
        .setIn(['loadWallpapers', 'loading'], false)
        .setIn(['payload', 'wallpapers'], []);
    case GET_TOTAL_WALLPAPER:
      return state
        .setIn(['getTotalWallpaper', 'loading'], true)
        .setIn(['getTotalWallpaper', 'error'], null)
        .setIn(['payload', 'total'], 0);
    case GET_TOTAL_WALLPAPER_SUCCESS:
      return state
        .setIn(['getTotalWallpaper', 'loading'], false)
        .setIn(['getTotalWallpaper', 'error'], null)
        .setIn(['payload', 'total'], payload.count);
    case GET_TOTAL_WALLPAPER_ERROR:
      return state
        .setIn(['getTotalWallpaper', 'error'], error)
        .setIn(['getTotalWallpaper', 'loading'], false)
        .setIn(['payload', 'total'], 0);
    default:
      return state;
  }
}

export default wallpaper;

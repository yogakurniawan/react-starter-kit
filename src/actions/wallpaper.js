import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  SET_PAGE,
} from 'constants/ActionTypes';
import {
  BASE_API_URL,
  PER_PAGE,
} from 'constants/index';
import request from 'utils/request';

const WALLPAPERS_API = `${BASE_API_URL}/Wallpapers`;

export function loadWallpapers() {
  return {
    type: LOAD_WALLPAPERS,
  };
}

export function loadWallpapersSuccess(wallpapers) {
  return {
    type: LOAD_WALLPAPERS_SUCCESS,
    payload: {
      wallpapers,
    },
  };
}

export function loadWallpapersError(error) {
  return {
    type: LOAD_WALLPAPERS_ERROR,
    error,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

export function getWallpapers(page) {
  return (dispatch) => {
    dispatch(loadWallpapers());
    const queryParams = {
      'filter[limit]': PER_PAGE,
      'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
    };
    return request(WALLPAPERS_API, queryParams)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        throw new Error(`${response.status}: ${response.statusText}`);
      })
      .then(wallpapers => dispatch(loadWallpapersSuccess(wallpapers)))
      .catch(error => dispatch(loadWallpapersError(error.message)))
  };
}

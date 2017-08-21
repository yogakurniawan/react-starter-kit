import {
  LOAD_WALLPAPERS,
  LOAD_WALLPAPERS_SUCCESS,
  LOAD_WALLPAPERS_ERROR,
  SET_TOTAL_WALLPAPER,
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

export function setTotalWallpaper(total) {
  return {
    type: SET_TOTAL_WALLPAPER,
    payload: {
      total,
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

export function getWallpapersByCategory({ page, category }) {
  return (dispatch) => {
    dispatch(loadWallpapers());
    dispatch(setPage(page));
    const queryParams = {
      'filter[where][categoryId]': category.id,
      'filter[limit]': PER_PAGE,
      'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
    };
    if (category === 'all') {
      delete queryParams['filter[where][categoryId]'];
    }
    return request(WALLPAPERS_API, { queryParams })
      .then((wallpapers) => {
        dispatch(loadWallpapersSuccess(wallpapers));
        dispatch(setTotalWallpaper(category.total));
      })
      .catch(error => dispatch(loadWallpapersError(error.message)));
  };
}

export function getWallpapers({ page }) {
  return (dispatch) => {
    dispatch(loadWallpapers());
    dispatch(setPage(page));
    const queryParams = {
      'filter[limit]': PER_PAGE,
      'filter[skip]': page > 1 ? ((page - 1) * PER_PAGE) : 0,
    };
    return request(WALLPAPERS_API, { queryParams })
      .then((wallpapers) => {
        request(`${WALLPAPERS_API}/count`)
          .then((response) => {
            dispatch(loadWallpapersSuccess(wallpapers));
            dispatch(setTotalWallpaper(response.count));
          });
      })
      .catch(error => dispatch(loadWallpapersError(error.message)));
  };
}

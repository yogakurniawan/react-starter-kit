import {
  LOAD_BRANDS,
  SET_FILTER_KEYWORD,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from 'constants/ActionTypes';

export function loadBrands() {
  return {
    type: LOAD_BRANDS,
  };
}

export function brandsLoaded(brands) {
  return {
    type: LOAD_BRANDS_SUCCESS,
    payload: {
      brands,
    },
  };
}

export function brandsLoadingError(error) {
  return {
    type: LOAD_BRANDS_ERROR,
    error,
  };
}

export function filter(filterKeyword) {
  return {
    type: SET_FILTER_KEYWORD,
    payload: {
      filterKeyword,
    },
  };
}

import {
  LOAD_BRANDS,
  FILTER_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from 'constants/ActionTypes';

export function loadBrands() {
  return {
    type: LOAD_BRANDS,
  };
}

export function filter(keyword) {
  return {
    type: FILTER_BRANDS,
    payload: {
      keyword,
    },
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

import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
} from 'constants/ActionTypes';
import {
  BASE_API_URL,
} from 'constants/index';
import request from 'utils/request';

const CATEGORIES_API = `${BASE_API_URL}/Categories`;

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  };
}

export function loadCategoriesSuccess(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: {
      categories,
    },
  };
}

export function loadCategoriesError(error) {
  return {
    type: LOAD_CATEGORIES_ERROR,
    error,
  };
}

export function getCategories() {
  return (dispatch) => {
    dispatch(loadCategories());
    return request(CATEGORIES_API)
      .then(categories => dispatch(loadCategoriesSuccess(categories)))
      .catch(error => dispatch(loadCategoriesError(error.message)));
  };
}

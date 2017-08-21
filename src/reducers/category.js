import { fromJS } from 'immutable';

import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORY_BY_NAME,
  SET_SELECTED_CATEGORY,
  LOAD_CATEGORY_BY_NAME_ERROR,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: {
    loadCategories: false,
    loadCategoryByName: false,
  },
  error: {
    loadCategories: null,
    loadCategoryByName: null,
  },
  payload: {
    categories: [],
    selectedCategory: {
      name: '',
      id: null,
      total: 0,
    },
  },
});

function category(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case LOAD_CATEGORIES:
      return state
        .setIn(['loadCategories', 'loading'], true)
        .setIn(['loadCategories', 'error'], null)
        .setIn(['payload', 'categories'], []);
    case LOAD_CATEGORIES_SUCCESS:
      return state
        .setIn(['loadCategories', 'loading'], false)
        .setIn(['loadCategories', 'error'], null)
        .setIn(['payload', 'categories'], payload.categories);
    case LOAD_CATEGORIES_ERROR:
      return state
        .setIn(['loadCategories', 'error'], error)
        .setIn(['loadCategories', 'loading'], false)
        .setIn(['payload', 'categories'], []);
    case LOAD_CATEGORY_BY_NAME:
      return state
        .setIn(['loadCategoryByName', 'loading'], true)
        .setIn(['loadCategoryByName', 'error'], null)
        .setIn(['payload', 'selectedCategory'], initialState.payload.selectedCategory);
    case SET_SELECTED_CATEGORY:
      return state
        .setIn(['loadCategoryByName', 'loading'], false)
        .setIn(['loadCategoryByName', 'error'], null)
        .setIn(['payload', 'selectedCategory'], payload.category);
    case LOAD_CATEGORY_BY_NAME_ERROR:
      return state
        .setIn(['loadCategoryByName', 'error'], error)
        .setIn(['loadCategoryByName', 'loading'], false)
        .setIn(['payload', 'selectedCategory'], initialState.payload.selectedCategory);
    default:
      return state;
  }
}

export default category;

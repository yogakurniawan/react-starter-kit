import { fromJS } from 'immutable';

import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: false,
  error: null,
  payload: {
    categories: [],
  },
});

function category(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case LOAD_CATEGORIES:
      return state
        .set('loading', true)
        .set('error', null)
        .setIn(['payload', 'categories'], []);
    case LOAD_CATEGORIES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', null)
        .setIn(['payload', 'categories'], payload.categories);
    case LOAD_CATEGORIES_ERROR:
      return state
        .set('error', error)
        .set('loading', false)
        .setIn(['payload', 'categories'], []);
    default:
      return state;
  }
}

export default category;


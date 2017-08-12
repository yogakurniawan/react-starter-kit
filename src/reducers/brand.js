import { fromJS } from 'immutable';

import {
  LOAD_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
  SET_FILTER_KEYWORD,
} from 'constants/ActionTypes';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: null,
  payload: {
    brands: null,
    filterKeyword: null,
  },
});

function brandsReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOAD_BRANDS:
      return state
        .set('loading', true)
        .set('error', null)
        .setIn(['payload', 'brands'], null);
    case LOAD_BRANDS_SUCCESS:
      return state
        .setIn(['payload', 'brands'], payload.brands)
        .set('loading', false)
        .set('error', null);
    case SET_FILTER_KEYWORD:
      return state
        .setIn(['payload', 'filterKeyword'], payload.filterKeyword);
    case LOAD_BRANDS_ERROR:
      return state
        .setIn(['payload', 'brands'], null)
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default brandsReducer;


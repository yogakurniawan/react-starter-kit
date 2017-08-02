import { fromJS } from 'immutable';

import {
  LOAD_BRANDS,
  FILTER_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from 'constants/ActionTypes';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: null,
  isFiltered: false,
  data: {
    brands: null,
    filteredBrands: null,
  },
});

function brandsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BRANDS:
      return state
        .set('isFiltered', false)
        .set('loading', true)
        .set('error', null)
        .setIn(['data', 'brands'], null);
    case FILTER_BRANDS: {
      const brands = state.getIn(['data', 'brands']);
      const filter = brand => brand.title.toLowerCase().includes(action.keyword.toLowerCase());
      const filteredBrands = brands.filter(filter);
      return state
        .set('isFiltered', true)
        .setIn(['data', 'filteredBrands'], filteredBrands);
    }
    case LOAD_BRANDS_SUCCESS:
      return state
        .setIn(['data', 'brands'], action.brands)
        .set('loading', false);
    case LOAD_BRANDS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default brandsReducer;


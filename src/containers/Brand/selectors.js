import { createSelector } from 'reselect';

const selectBrands = state => state.get('brand');
console.log('called');
const makeSelectBrands = () => createSelector(
  selectBrands,
  brandsState => brandsState.getIn(['data', 'brands']),
);

const makeSelectLoading = () => createSelector(
  selectBrands,
  brandsState => brandsState.get('loading'),
);

const makeSelectError = () => createSelector(
  selectBrands,
  brandsState => brandsState.get('error'),
);

const makeSelectFilteredBrands = () => createSelector(
  selectBrands,
  brandsState => brandsState.getIn(['data', 'filteredBrands']),
);

const makeSelectIsFiltered = () => createSelector(
  selectBrands,
  brandsState => brandsState.get('isFiltered'),
);

export {
  makeSelectBrands,
  makeSelectLoading,
  makeSelectError,
  makeSelectFilteredBrands,
  makeSelectIsFiltered,
};

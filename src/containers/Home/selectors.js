import { createSelector } from 'reselect';

const selectBrands = state => state.get('brand');

const filterBrands = () => createSelector(
  selectBrands,
  state => ({ keyword }) => {
    let payload = state.getIn(['payload', 'brands']);
    if (keyword) {
      payload = payload.filter(item => (new RegExp(keyword, 'i')).test(item.title));
    }

    return payload;
  },
);

const makeSelectLoading = () => createSelector(
  selectBrands,
  brandsState => brandsState.get('loading'),
);

const makeSelectError = () => createSelector(
  selectBrands,
  brandsState => brandsState.get('error'),
);

const selectFilterKeyword = () => createSelector(
  selectBrands,
  brandsState => brandsState.getIn(['payload', 'filterKeyword']),
);

export {
  filterBrands,
  makeSelectLoading,
  makeSelectError,
  selectFilterKeyword,
};

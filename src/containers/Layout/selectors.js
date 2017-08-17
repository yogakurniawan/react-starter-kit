import { createSelector } from 'reselect';

const category = state => state.get('category');

const selectCategories = () => createSelector(
  category,
  state => state.getIn(['payload', 'categories']),
);

export {
  selectCategories,
  category,
};

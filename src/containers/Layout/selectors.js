import { createSelector } from 'reselect';

const category = state => state.get('category');
const global = state => state.get('global');

const selectCategories = () => createSelector(
  category,
  state => state.getIn(['payload', 'categories']),
);

const selectScreenWidth = () => createSelector(
  global,
  state => state.getIn(['payload', 'width']),
);

export {
  selectCategories,
  selectScreenWidth,
  category,
};

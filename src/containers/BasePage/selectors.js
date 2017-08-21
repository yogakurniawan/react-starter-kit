import { createSelector } from 'reselect';

const wallpaper = state => state.get('wallpaper');
const category = state => state.get('category');

const selectWallpapers = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpapers']),
);

const selectPage = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'page']),
);

const selectTotal = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'total']),
);

const selectSelectedCategory = () => createSelector(
  category,
  state => state.getIn(['payload', 'selectedCategory']),
);

export {
  selectSelectedCategory,
  selectPage,
  selectWallpapers,
  selectTotal,
  wallpaper,
};

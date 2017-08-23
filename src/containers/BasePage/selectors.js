import { createSelector } from 'reselect';

const wallpaper = state => state.get('wallpaper');
const category = state => state.get('category');
const global = state => state.get('global');

const selectWallpapers = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpapers']),
);

const selectWallpaper = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpaper']),
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

const selectCategories = () => createSelector(
  category,
  state => state.getIn(['payload', 'categories']),
);

const selectScreenWidth = () => createSelector(
  global,
  state => state.getIn(['payload', 'width']),
);

export {
  selectScreenWidth,
  selectCategories,
  selectSelectedCategory,
  selectPage,
  selectWallpapers,
  selectWallpaper,
  selectTotal,
  wallpaper,
};

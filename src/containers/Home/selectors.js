import { createSelector } from 'reselect';

const wallpaper = state => state.get('wallpaper');

const selectWallpapers = () => createSelector(
  wallpaper,
  state => state.getIn(['payload', 'wallpapers']),
);

export {
  selectWallpapers,
  wallpaper,
};

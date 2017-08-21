import {
  SET_SCREEN_SIZE,
  SET_ACTIVE_CATEGORY,
} from 'constants/ActionTypes';

export function setScreenSize(width) {
  return {
    type: SET_SCREEN_SIZE,
    payload: {
      width,
    },
  };
}

export function setActiveCategory(category) {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: {
      category,
    },
  };
}

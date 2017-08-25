import {
  SET_SCREEN_SIZE,
  SET_ACTIVE_CATEGORY,
  SET_SELECTED_IPHONE_MODEL,
  SET_IPHONE_MODEL,
} from 'constants/ActionTypes';

export function setScreenSize(width) {
  return {
    type: SET_SCREEN_SIZE,
    payload: width,
  };
}

export function setActiveCategory(category) {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
}

export function setSelectedIphoneModel(model) {
  return {
    type: SET_SELECTED_IPHONE_MODEL,
    payload: model,
  };
}

export function setIphoneModel(model) {
  return {
    type: SET_IPHONE_MODEL,
    payload: model,
  };
}

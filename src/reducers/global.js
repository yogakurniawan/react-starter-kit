import { fromJS } from 'immutable';

import {
  SET_SCREEN_SIZE,
  SET_ACTIVE_CATEGORY,
  SET_SELECTED_IPHONE_MODEL,
  SET_IPHONE_MODEL,
} from 'constants/ActionTypes';

const initialState = fromJS({
  payload: {
    width: null,
    activeCategory: null,
    selectedIphoneModel: null,
    iphoneModel: null,
  },
});

function global(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_IPHONE_MODEL:
      return state
        .setIn(['payload', 'iphoneModel'], payload);
    case SET_SELECTED_IPHONE_MODEL:
      return state
        .setIn(['payload', 'selectedIphoneModel'], payload);
    case SET_SCREEN_SIZE:
      return state
        .setIn(['payload', 'width'], payload);
    case SET_ACTIVE_CATEGORY:
      return state
        .setIn(['payload', 'activeCategory'], payload);
    default:
      return state;
  }
}

export default global;

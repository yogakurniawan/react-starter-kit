import { fromJS } from 'immutable';

import {
  SET_SCREEN_SIZE,
  SET_ACTIVE_CATEGORY,
} from 'constants/ActionTypes';

const initialState = fromJS({
  payload: {
    width: null,
    activeCategory: null,
  },
});

function global(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_SCREEN_SIZE:
      return state
        .setIn(['payload', 'width'], payload.width);
    case SET_ACTIVE_CATEGORY:
      return state
        .setIn(['payload', 'activeCategory'], payload.category);
    default:
      return state;
  }
}

export default global;

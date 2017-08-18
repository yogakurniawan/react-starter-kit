import { fromJS } from 'immutable';

import {
  SET_SCREEN_SIZE,
} from 'constants/ActionTypes';

const initialState = fromJS({
  payload: {
    width: null,
  },
});

function global(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_SCREEN_SIZE:
      return state
        .setIn(['payload', 'width'], payload.width);
    default:
      return state;
  }
}

export default global;


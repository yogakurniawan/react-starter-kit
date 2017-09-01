import { fromJS } from 'immutable';
import { SET_RUNTIME_VARIABLE } from '../constants';

export default function runtime(state = fromJS({}), action) {
  switch (action.type) {
    case SET_RUNTIME_VARIABLE:
      return state
        .set(action.payload.name, action.payload.value);
    default:
      return state;
  }
}

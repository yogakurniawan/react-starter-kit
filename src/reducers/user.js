import { fromJS } from 'immutable';

export default function user(state = fromJS({}), action) {
  switch (action.type) {
    default:
      return state;
  }
}

import {
  SET_SCREEN_SIZE,
} from 'constants/ActionTypes';

export default function setScreenSize(width) {
  return {
    type: SET_SCREEN_SIZE,
    payload: {
      width,
    },
  };
}


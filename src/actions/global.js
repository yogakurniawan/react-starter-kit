import {
  SET_SEARCH_QUERY,
  SET_DEVICE_BRAND,
  LOAD_DEVICE_BY_NAME,
  SET_SELECTED_DEVICE,
  LOAD_DEVICE_BY_NAME_ERROR,
} from 'constants/ActionTypes';

export function setDeviceBrand(brand) {
  return {
    type: SET_DEVICE_BRAND,
    payload: {
      brand,
    },
  };
}

export function loadDeviceByName(brand, name) {
  return {
    type: LOAD_DEVICE_BY_NAME,
    payload: {
      brand,
      name,
    },
  };
}

export function loadDeviceByNameError(error) {
  return {
    type: LOAD_DEVICE_BY_NAME_ERROR,
    error,
  };
}

export function setSelectedDevice(device) {
  return {
    type: SET_SELECTED_DEVICE,
    payload: {
      device,
    },
  };
}

export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    payload: {
      query,
    },
  };
}


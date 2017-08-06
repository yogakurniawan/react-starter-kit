import {
  LOAD_DEVICES,
  LOAD_DEVICES_SUCCESS,
  LOAD_DEVICES_ERROR,
  FIND_ALL_DEVICES,
  FIND_ALL_DEVICES_SUCCESS,
  FIND_ALL_DEVICES_ERROR,
  GET_TOTAL_DEVICE,
  GET_TOTAL_DEVICE_SUCCESS,
  GET_TOTAL_DEVICE_ERROR,
  SET_PAGE,
} from 'constants/ActionTypes';

export function loadDevices(brand, page) {
  return {
    type: LOAD_DEVICES,
    payload: {
      brand,
      page,
    },
  };
}

export function loadDevicesSuccess(devices) {
  return {
    type: LOAD_DEVICES_SUCCESS,
    payload: {
      devices,
    },
  };
}

export function loadDevicesError(error) {
  return {
    type: LOAD_DEVICES_ERROR,
    error,
  };
}

export function getTotalDevice(brand) {
  return {
    type: GET_TOTAL_DEVICE,
    payload: {
      brand,
    },
  };
}

export function getTotalDeviceSuccess(total) {
  return {
    type: GET_TOTAL_DEVICE_SUCCESS,
    payload: {
      total,
    },
  };
}

export function getTotalDeviceError(error) {
  return {
    type: GET_TOTAL_DEVICE_ERROR,
    error,
  };
}

export function findAllDevices() {
  return {
    type: FIND_ALL_DEVICES,
  };
}

export function findAllDevicesSuccess(devices) {
  return {
    type: FIND_ALL_DEVICES_SUCCESS,
    payload: {
      devices,
    },
  };
}

export function findAllDevicesError(error) {
  return {
    type: FIND_ALL_DEVICES_ERROR,
    error,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page,
  };
}

// export function fetchSomething() {
//     // the withExtraArgument function injects a third argument here (you could use an object too and
//     // destructure it where you need the different parts if you need more things injected) - if we wouldn't
//     // have set it above in the root app, we would still fall back to fetch
//     return (dispatch, getState, fetchModule = fetch) => {
//         return fetchModule('http://localhost/api/something', { method: 'get' })
//         .then((response) => {
//             if (response.status === 200) {
//                 return response.json();
//             }

//             throw new Error(`${response.status}: ${response.statusText}`);
//         })
//         .then((something) => dispatch(someActionThatInformsTheStoreToStoreIt(something)))
//         .catch((error) => dispatch(anErrorActionCreatorEgSetErrorThatJustStoresTheErrorMessage(error.message)));
//     };
// }

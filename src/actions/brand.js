import request from 'utils/request';

import {
  BASE_API_URL,
} from 'constants';
import {
  LOAD_BRANDS,
  FILTER_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
} from 'constants/ActionTypes';

export function loadBrands() {
  return {
    type: LOAD_BRANDS,
  };
}

export function filter(keyword) {
  return {
    type: FILTER_BRANDS,
    payload: {
      keyword,
    },
  };
}

export function brandsLoaded(brands) {
  return {
    type: LOAD_BRANDS_SUCCESS,
    brands,
  };
}

export function brandsLoadingError(error) {
  return {
    type: LOAD_BRANDS_ERROR,
    error,
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

// export function* getBrands() {
//   const queryParams = {
//     'filter[order]': 'title ASC',
//   };
//   const requestURL = `${BASE_API_URL}/brands`;
//   try {
//     // Call our request helper (see 'utils/request')
//     const brands = yield call(request, requestURL, {
//       queryParams,
//     });
//     yield put(brandsLoaded(brands));
//   } catch (err) {
//     yield put(brandsLoadingError(err));
//   }
// }

// export function* brandsList() {
//   yield takeLatest(LOAD_BRANDS, getBrands);
// }

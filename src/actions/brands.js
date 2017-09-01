import fetch from '../core/fetch';

import {
  LOAD_BRANDS,
  FILTER_BRANDS,
  LOAD_BRANDS_SUCCESS,
  LOAD_BRANDS_ERROR,
  BASE_API_URL,
} from '../constants';

const BRANDS_URL = `${BASE_API_URL}/brands`;

export function loadBrands(slug) {
  return {
    type: LOAD_BRANDS,
    slug,
  };
}

export function filterBrands(keyword) {
  return {
    type: FILTER_BRANDS,
    keyword,
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

export const requestLoadBrands = async () => {
  try {
    const resp = await fetch(BRANDS_URL, {
      method: 'get',
    });
    const brands = await resp.json();
    brandsLoaded(brands);
  } catch (error) {
    brandsLoadingError(error);
  }
};

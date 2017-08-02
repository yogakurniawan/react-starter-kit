import React from 'react';
// import { BASE_API_URL } from '../../constants';
import BaseLayout from '../../components/BaseLayout';
import Brand from '../../containers/Brand';

async function action({ fetch }) {
  const resp = await fetch('/api/brands');
  const { data } = await resp.json();
  console.log(data);
  // if (!data || !data.news) throw new Error('Failed to load the brands.');
  return {
    chunks: ['brand'],
    title: 'Brands Page',
    component: <BaseLayout><Brand /></BaseLayout>,
  };
}

export default action;

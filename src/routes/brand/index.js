import React from 'react';
import BaseLayout from '../../components/BaseLayout';
import Brand from '../../containers/Brand';

async function action({ fetch }) {
  const resp = await fetch('/api/brands', {
    method: 'GET',
  });
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the brands.');
  return {
    chunks: ['brand'],
    title: 'Brands Page',
    component: <BaseLayout><Brand brands={data} /></BaseLayout>,
  };
}

export default action;

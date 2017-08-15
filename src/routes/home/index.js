import React from 'react';
import BaseLayout from '../../components/BaseLayout';
import Home from '../../containers/Home';

async function action({ fetch }) {
  const resp = await fetch('/api/brands', {
    method: 'GET',
  });
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the brands.');
  return {
    chunks: ['home'],
    title: 'Home Page',
    component: <BaseLayout><Home loading brands={data} /></BaseLayout>,
  };
}

export default action;

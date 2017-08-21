import React from 'react';
import Layout from '../../containers/Layout';
import Home from '../../containers/Home';

async function action({ fetch, params }) {
  const resp = await fetch('/api/Categories', {
    method: 'GET',
  });
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the categories.');
  const { pageNumber } = params;
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
  };
  const component = <Layout categories={data}><Home params={parameters} /></Layout>;
  return {
    chunks: ['home'],
    title: 'Home Page',
    component,
  };
}

export default action;

import React from 'react';
import Layout from '../../containers/Layout';
import Home from '../../containers/Home';

async function action({ fetch }) {
  const resp = await fetch('/api/Categories', {
    method: 'GET',
  });
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the categories.');
  return {
    chunks: ['home'],
    title: 'Home Page',
    component: <Layout categories={data}><Home /></Layout>,
  };
}

export default action;

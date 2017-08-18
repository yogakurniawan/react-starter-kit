import React from 'react';
import Layout from '../../containers/Layout';
import Wallpaper from '../../containers/Wallpaper';

async function action({ fetch, params }) {
  const resp = await fetch('/api/Categories', {
    method: 'GET',
  });
  const data = await resp.json();
  if (!data) throw new Error('Failed to load the categories.');
  return {
    chunks: ['wallpaper'],
    title: 'Wallpaper Page',
    component: <Layout categories={data}>
      <Wallpaper category={params.category} name={params.name} />
    </Layout>,
  };
}

export default action;

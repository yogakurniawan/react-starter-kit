import React from 'react';
import Layout from '../../containers/Layout';
import Wallpaper from '../../containers/Wallpaper';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const categories = categoryReducer.getIn(['payload', 'categories']);
  let data = categories;
  if (!data.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    data = await resp.json();
    if (!data) throw new Error('Failed to load the categories.');
  }
  return {
    chunks: ['wallpaper'],
    title: 'Wallpaper Page',
    component: <Layout showCategories={false} categories={data}>
      <Wallpaper name={params.name} />
    </Layout>,
  };
}

export default action;

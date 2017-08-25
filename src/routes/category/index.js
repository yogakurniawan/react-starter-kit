import React from 'react';
import Layout from '../../containers/Layout';
import Category from '../../containers/Category';

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

  const { pageNumber, category } = params;
  const selectedCategory = data.find(item => item.name === category);
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    category: {
      total: selectedCategory.total_wallpaper,
      name: category,
      id: selectedCategory.id,
    },
  };
  const component = (
    <Layout
      activeCategory={category}
      categories={data}
    >
      <Category params={parameters} />
    </Layout>);
  return {
    chunks: ['category'],
    title: 'Category Page',
    component,
  };
}

export default action;

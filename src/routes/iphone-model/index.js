import React from 'react';
import Layout from '../../containers/Layout';
import IphoneModel from '../../containers/IphoneModel';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const globalReducer = state.get('global');
  const selectedIphoneModel = globalReducer.getIn(['payload', 'selectedIphoneModel']);
  const iphoneModels = globalReducer.getIn(['payload', 'iphoneModels']);
  const categories = categoryReducer.getIn(['payload', 'categories']);
  let data = categories;
  let iphoneModelsData = iphoneModels;
  if (!data.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    data = await resp.json();
    if (!data) throw new Error('Failed to load the categories.');
  }

  if (!iphoneModelsData) {
    const resp = await fetch('/api/IphoneModels', {
      method: 'GET',
    });
    iphoneModelsData = await resp.json();
    if (!iphoneModelsData) throw new Error('Failed to load the iphone models.');
  }
  const { pageNumber, iphoneModel } = params;
  const theIphoneModel = iphoneModelsData.find(model => model.id === selectedIphoneModel);
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    iphoneModel: {
      total: theIphoneModel.total_wallpaper,
      name: iphoneModel,
    },
  };
  const component = (
    <Layout
      categories={data}
    >
      <IphoneModel params={parameters} />
    </Layout>);
  return {
    chunks: ['iphone-models'],
    title: 'Iphone Model Page',
    component,
  };
}

export default action;

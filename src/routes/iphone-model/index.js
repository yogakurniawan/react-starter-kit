import React from 'react';
import Layout from '../../containers/Layout';
import IphoneModel from '../../containers/IphoneModel';
import * as globalActions from '../../actions/global';

async function action({ fetch, params, store }) {
  debugger;
  const state = store.getState();
  const categoryReducer = state.get('category');
  const globalReducer = state.get('global');
  const selectedIphoneModel = globalReducer.getIn(['payload', 'selectedIphoneModel']);
  const iphoneModelState = globalReducer.getIn(['payload', 'iphoneModel']);
  const categories = categoryReducer.getIn(['payload', 'categories']);
  let data = categories;
  let thisIphoneModel = iphoneModelState;
  if (!data.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    data = await resp.json();
    if (!data) throw new Error('Failed to load the categories.');
  }
  const { pageNumber, iphoneModel } = params;
  if (!thisIphoneModel) {
    const resp = await fetch(`/api/IphoneModels/${selectedIphoneModel}`, {
      method: 'GET',
    });
    thisIphoneModel = await resp.json();
    store.dispatch(globalActions.setIphoneModel(thisIphoneModel));
    if (!thisIphoneModel) throw new Error('Failed to load the iphone models.');
  }

  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    iphoneModel: {
      total: thisIphoneModel.total_wallpaper,
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

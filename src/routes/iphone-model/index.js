import React from 'react';
import Immutable from 'immutable';
import Layout from '../../containers/Layout';
import IphoneModel from '../../containers/IphoneModel';
import * as globalActions from '../../actions/global';

async function action({ fetch, params, store }) {
  const state = store.getState();
  const categoryReducer = state.get('category');
  const globalReducer = state.get('global');
  const modelId = globalReducer.getIn(['payload', 'selectedIphoneModel']);
  const model = globalReducer.getIn(['payload', 'iphoneModel']);
  const categories = categoryReducer.getIn(['payload', 'categories']);
  let data = categories;
  let thisIphoneModel = model;
  if (Immutable.Map.isMap(thisIphoneModel)) {
    thisIphoneModel = model.toObject();
  }
  if (!data.length) {
    const resp = await fetch('/api/Categories', {
      method: 'GET',
    });
    data = await resp.json();
    if (!data) throw new Error('Failed to load the categories.');
  }
  const { pageNumber, iphoneModel } = params;
  if (!thisIphoneModel) {
    let url = `/api/IphoneModels/${modelId}`;
    if (!modelId) {
      url = `/api/IphoneModels?filter[where][code]=${iphoneModel.substring(iphoneModel.lastIndexOf('-') + 1)}`;
    }
    const resp = await fetch(url, {
      method: 'GET',
    });
    thisIphoneModel = await resp.json();
    if (Array.isArray(thisIphoneModel)) {
      thisIphoneModel = thisIphoneModel[0];
    }
    store.dispatch(globalActions.setIphoneModel(thisIphoneModel));
    if (!thisIphoneModel) throw new Error('Failed to load the iphone models.');
  }
  const parameters = {
    pageNumber: pageNumber ? parseInt(pageNumber, 10) : 1,
    iphoneModel: {
      total: thisIphoneModel.total_wallpaper,
      name: thisIphoneModel.name,
      route: iphoneModel,
    },
  };
  const component = (
    <Layout
      categories={data}
    >
      <IphoneModel params={parameters} />
    </Layout>);
  return {
    chunks: ['iphone-model'],
    title: 'Iphone Model Page',
    component,
  };
}

export default action;

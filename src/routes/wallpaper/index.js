import React from 'react';
import Layout from '../../containers/Layout';
import Wallpaper from '../../containers/Wallpaper';

async function action({ params }) {
  return {
    chunks: ['wallpaper'],
    title: 'Wallpaper Page',
    component: <Layout>
      <Wallpaper name={params.name} />
    </Layout>,
  };
}

export default action;

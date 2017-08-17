import React from 'react';
import Layout from '../../containers/Layout';
import Home from '../../containers/Home';

async function action() {
  return {
    chunks: ['home'],
    title: 'Home Page',
    component: <Layout><Home /></Layout>,
  };
}

export default action;

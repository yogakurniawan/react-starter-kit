import React from 'react';
import BaseLayout from '../../components/BaseLayout';
import Home from '../../containers/Home';

async function action() {
  return {
    chunks: ['home'],
    title: 'Home Page',
    component: <BaseLayout><Home /></BaseLayout>,
  };
}

export default action;

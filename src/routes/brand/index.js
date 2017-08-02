import React from 'react';
import BaseLayout from '../../components/BaseLayout';
import Brand from '../../containers/Brand';

function action() {
  return {
    chunks: ['brand'],
    title: 'Brands Page',
    component: <BaseLayout><Brand /></BaseLayout>,
  };
}

export default action;

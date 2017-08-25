import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as wallpaperActions from 'actions/wallpaper';
import { loadItem } from '../../utils/common';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class IphoneModel extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const {
      setTotalWallpaper,
      setPage,
      params,
      page,
      getWallpapersByIphoneModel,
      selectedIphoneModel,
    } = this.props;
    const { iphoneModel, pageNumber } = params;
    let thisIphoneModel = selectedIphoneModel;
    if (!thisIphoneModel) {
      thisIphoneModel = loadItem('selectedIphoneModel');
    }
    setTotalWallpaper(iphoneModel.total);
    if (page !== pageNumber) {
      setPage(pageNumber);
      getWallpapersByIphoneModel({
        page: pageNumber,
        modelId: thisIphoneModel,
      });
    } else {
      setPage(1);
      getWallpapersByIphoneModel({
        page: 1,
        modelId: thisIphoneModel,
      });
    }
  }

  componentWillReceiveProps(props) {
    const {
      setPage,
      setTotalWallpaper,
      params,
      page,
      getWallpapersByIphoneModel,
      selectedIphoneModel,
    } = props;
    const { iphoneModel, pageNumber } = params;
    let thisIphoneModel = selectedIphoneModel;
    if (!thisIphoneModel) {
      thisIphoneModel = loadItem('selectedIphoneModel');
    }
    setTotalWallpaper(iphoneModel.total);
    if (page !== pageNumber) {
      setPage(pageNumber);
      getWallpapersByIphoneModel({
        page: params.pageNumber,
        modelId: thisIphoneModel,
      });
    }
  }

  render() {
    const { params } = this.props;
    const route = `model/${params.iphoneModel.name}`;
    return <BasePage route={route} />;
  }
}

IphoneModel.propTypes = {
  page: PropTypes.number.isRequired,
  selectedIphoneModel: PropTypes.string,
  getWallpapersByIphoneModel: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setTotalWallpaper: PropTypes.func.isRequired,
  params: PropTypes.shape({
    category: PropTypes.object,
    pageNumber: PropTypes.number,
  }),
};

IphoneModel.defaultProps = {
  params: null,
  selectedIphoneModel: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  getWallpapersByIphoneModel: wallpaperActions.getWallpapersByIphoneModel,
  setTotalWallpaper: wallpaperActions.setTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  page: selectors.selectPage(),
  total: selectors.selectTotal(),
  category: selectors.selectSelectedCategory(),
  selectedIphoneModel: selectors.selectSelectedIphoneModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(IphoneModel);

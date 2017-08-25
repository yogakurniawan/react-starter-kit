import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as wallpaperActions from 'actions/wallpaper';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class Category extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const {
      setTotalWallpaper,
      setPage,
      category,
      params,
      page,
      getWallpapersByCategory,
    } = this.props;
    const thisCategory = category.name ? category : params.category;
    setTotalWallpaper(thisCategory.total);
    if (page !== params.pageNumber) {
      setPage(params.pageNumber);
      getWallpapersByCategory({
        page: params.pageNumber,
        category: category.name ? category : params.category,
      });
    } else {
      setPage(1);
      getWallpapersByCategory({
        page: 1,
        category: category.name ? category : params.category,
      });
    }
  }

  componentWillReceiveProps(props) {
    const {
      setPage,
      setTotalWallpaper,
      category,
      params,
      page,
      getWallpapersByCategory,
    } = props;
    const thisCategory = category.name ? category : params.category;
    setTotalWallpaper(thisCategory.total);
    if (page !== params.pageNumber) {
      setPage(params.pageNumber);
      getWallpapersByCategory({
        page: params.pageNumber,
        category: category.name ? category : params.category,
      });
    }
  }

  render() {
    const { category, params } = this.props;
    const categoryFromRoute = params.category;
    let route = category.name;
    if (categoryFromRoute && !route) {
      route = categoryFromRoute.name;
    }
    return <BasePage route={route} />;
  }
}

Category.propTypes = {
  page: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setTotalWallpaper: PropTypes.func.isRequired,
  params: PropTypes.shape({
    category: PropTypes.object,
    pageNumber: PropTypes.number,
  }),
};

Category.defaultProps = {
  params: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
  setTotalWallpaper: wallpaperActions.setTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  page: selectors.selectPage(),
  total: selectors.selectTotal(),
  category: selectors.selectSelectedCategory(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Category);

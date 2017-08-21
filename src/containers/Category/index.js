import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as wallpaperActions from 'actions/wallpaper';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class Category extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { category, params, page, getWallpapersByCategory } = this.props;
    if (page !== params.pageNumber) {
      getWallpapersByCategory({
        page: params.pageNumber,
        category: category.name ? category : params.category,
      });
    } else {
      getWallpapersByCategory({
        page: 1,
        category: category.name ? category : params.category,
      });
    }
  }

  componentWillReceiveProps(props) {
    const { category, params, page, getWallpapersByCategory } = props;
    if (page !== params.pageNumber) {
      getWallpapersByCategory({
        page: params.pageNumber,
        category: category.name ? category : params.category,
      });
    }
  }

  render() {
    const { params } = this.props;
    return <BasePage categoryFromRoute={params.category} />;
  }
}

Category.propTypes = {
  page: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
  params: PropTypes.shape({
    category: PropTypes.object,
    pageNumber: PropTypes.number,
  }),
};

Category.defaultProps = {
  params: null,
};

const mapDispatchToProps = {
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
};

const mapStateToProps = createStructuredSelector({
  page: selectors.selectPage(),
  category: selectors.selectSelectedCategory(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Category);

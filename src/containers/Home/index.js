import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as wallpaperActions from 'actions/wallpaper';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { getWallpapers, params, page } = this.props;
    if (page !== params.pageNumber) {
      getWallpapers({ page: params.pageNumber });
    } else {
      getWallpapers({ page: 1 });
    }
  }

  componentWillReceiveProps(props) {
    const { params, page, getWallpapers, category } = props;
    if (!category.name && page !== params.pageNumber) {
      getWallpapers({ page: params.pageNumber });
    }
  }

  render() {
    return <BasePage />;
  }
}

Home.propTypes = {
  page: PropTypes.number.isRequired,
  getWallpapers: PropTypes.func.isRequired,
  params: PropTypes.shape({
    pageNumber: PropTypes.number,
  }),
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

Home.defaultProps = {
  params: null,
  category: null,
};

const mapDispatchToProps = {
  getWallpapers: wallpaperActions.getWallpapers,
};

const mapStateToProps = createStructuredSelector({
  page: selectors.selectPage(),
  category: selectors.selectSelectedCategory(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

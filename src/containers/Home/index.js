import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as wallpaperActions from 'actions/wallpaper';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const {
      total,
      getWallpapers,
      params,
      page,
      setPage,
      getTotalWallpaper,
    } = this.props;
    if (total === 0) {
      getTotalWallpaper();
    }

    if (page !== params.pageNumber) {
      getWallpapers({ page: params.pageNumber });
      setPage(params.pageNumber);
    } else {
      setPage(1);
      getWallpapers({ page: 1 });
    }
  }

  componentWillReceiveProps(props) {
    const {
      total,
      getTotalWallpaper,
      params,
      page,
      getWallpapers,
      setPage,
    } = props;
    if (total === 0) {
      getTotalWallpaper();
    }

    if (Object.keys(params).length === 1 && page !== params.pageNumber) {
      setPage(params.pageNumber);
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
  setPage: PropTypes.func.isRequired,
  getTotalWallpaper: PropTypes.func.isRequired,
  params: PropTypes.shape({
    pageNumber: PropTypes.number,
  }),
  total: PropTypes.number.isRequired,
};

Home.defaultProps = {
  params: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  getWallpapers: wallpaperActions.getWallpapers,
  getTotalWallpaper: wallpaperActions.getTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  page: selectors.selectPage(),
  total: selectors.selectTotal(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

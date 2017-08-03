import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-styled-flexboxgrid';

import ContentList from 'components/ContentList';
import BrandTile from 'components/BrandTile';
import TopNavigation from 'components/TopNavigation';
import FilterBrand from 'components/FilterBrand';
import { brandsLoaded, filter as filterBrands } from 'actions/brand';
import {
  // makeSelectBrands,
  makeSelectFilteredBrands,
  makeSelectIsFiltered,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

class BrandsPage extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { brands } = this.props;
    this.props.brandsLoaded(brands);
  }

  handleFilterBrand(evt) {
    this.props.filterBrands(evt.target.value);
  }

  render() {
    const { loading, error, isFiltered, filteredBrands, brands } = this.props;
    const contentListProps = {
      loading,
      error,
      component: BrandTile,
      payload: isFiltered ? filteredBrands : brands,
    };

    return (
      <div>
        <TopNavigation title={'Brands'} subTitle="Find your favourite mobile phone brands and see a lot of devices. " />
        <Row center="xs">
          <Col xs={12} sm={8} md={8} lg={6}>
            { !loading && <FilterBrand onChange={evt => this.handleFilterBrand(evt)} /> }
            <ContentList {...contentListProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

BrandsPage.propTypes = {
  loading: PropTypes.bool,
  isFiltered: PropTypes.bool,
  filteredBrands: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  brands: PropTypes.oneOfType([
    PropTypes.array,
  ]),
  brandsLoaded: PropTypes.func,
  filterBrands: PropTypes.func,
};

BrandsPage.defaultProps = {
  loading: false,
  isFiltered: false,
  filteredBrands: false,
  brandsLoaded: () => {},
  error: null,
  brands: null,
  getBrands: () => {},
  filterBrands: () => {},
};

const mapDispatchToProps = {
  brandsLoaded,
  filterBrands,
};

const mapStateToProps = createStructuredSelector({
  // brands: makeSelectBrands(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isFiltered: makeSelectIsFiltered(),
  filteredBrands: makeSelectFilteredBrands(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BrandsPage);

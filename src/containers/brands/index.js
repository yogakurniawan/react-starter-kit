/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ContentList from 'components/ContentList';
import BrandTile from 'components/BrandTile';
import TopNavigation from 'components/TopNavigation';
import FilterBrands from 'components/FilterBrands';

import {
  makeSelectBrands,
  makeSelectFilteredBrands,
  makeSelectIsFiltered,
  makeSelectLoading,
  makeSelectError,
} from '../../selectors/brands';
import { loadBrands, filterBrands } from '../../actions/brands';

class BrandsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.loadBrands();
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
        <div className="row center-xs no-gap">
          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-6">
            { !loading && <FilterBrands onChange={(evt) => this.handleFilterBrand(evt)} /> }
            <ContentList {...contentListProps} />
          </div>
        </div>
      </div>
    );
  }
}

BrandsPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  filteredBrands: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]).isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  brands: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]).isRequired,
  loadBrands: PropTypes.func.isRequired,
  filterBrands: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  loadBrands,
  filterBrands,
};

const mapStateToProps = createStructuredSelector({
  brands: makeSelectBrands(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  isFiltered: makeSelectIsFiltered(),
  filteredBrands: makeSelectFilteredBrands(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BrandsPage);

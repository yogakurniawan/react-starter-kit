import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ContentList from 'components/ContentList';
import BrandTile from 'components/BrandTile';
import TopNavigation from 'components/TopNavigation';
import FilterBrands from 'components/FilterBrands';
import { loadBrands, filter as filterBrands } from 'actions/brand';
import {
  makeSelectBrands,
  makeSelectFilteredBrands,
  makeSelectIsFiltered,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

class BrandsPage extends Component { // eslint-disable-line react/prefer-stateless-function

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
            { !loading && <FilterBrands onChange={evt => this.handleFilterBrand(evt)} /> }
            <ContentList {...contentListProps} />
          </div>
        </div>
      </div>
    );
  }
}

BrandsPage.propTypes = {
  loading: React.PropTypes.bool,
  isFiltered: React.PropTypes.bool,
  filteredBrands: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  brands: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  loadBrands: React.PropTypes.func,
  filterBrands: React.PropTypes.func,
};

BrandsPage.defaultProps = {
  loading: false,
  isFiltered: false,
  filteredBrands: false,
  error: false,
  brands: false,
  loadBrands: () => {},
  filterBrands: () => {},
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

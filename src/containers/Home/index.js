import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-styled-flexboxgrid';

import ContentList from 'components/ContentList';
import BrandTile from 'components/BrandTile';
import TopNavigation from 'components/TopNavigation';
import FilterBrand from 'components/FilterBrand';
import { brandsLoaded, filter } from 'actions/brand';
import * as selectors from './selectors';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { brands } = this.props;
    this.props.brandsLoaded(brands);
  }

  handleFilterBrand(evt) {
    this.props.filter(evt.target.value);
  }

  // download() {
  //   const url = 'http://iphonewalls.net/wp-content/uploads/2017/07/Curious%20Tree%20Frog%20Funny%20iPhone%206+%20HD%20Wallpaper.jpg';
  //   const tempLink = document.createElement('a');
  //   tempLink.style.display = 'none';
  //   tempLink.href = url;
  //   tempLink.setAttribute('download', '');
  //   tempLink.setAttribute('target', '_blank');
  //   document.body.appendChild(tempLink);
  //   tempLink.click();
  // }

  render() {
    const { filterBrands, filterKeyword, brands } = this.props;
    const filteredBrands = filterBrands({
      keyword: filterKeyword,
    });
    const contentListProps = {
      loading: false,
      error: null,
      component: BrandTile,
      payload: filterKeyword ? filteredBrands : brands,
    };

    return (
      <div>
        <TopNavigation title={'Brands'} subTitle="Find your favourite mobile phone brands and see a lot of devices. " />
        <Row center="xs">
          <Col xs={12} sm={8} md={8} lg={6}>
            <FilterBrand onChange={evt => this.handleFilterBrand(evt)} />
            <ContentList {...contentListProps} />
          </Col>
        </Row>
      </div>
    );
  }
}

Home.propTypes = {
  brands: PropTypes.oneOfType([
    PropTypes.array,
  ]),
  brandsLoaded: PropTypes.func,
  filterKeyword: PropTypes.string,
  filterBrands: PropTypes.func,
  filter: PropTypes.func,
};

Home.defaultProps = {
  brandsLoaded: () => { },
  brands: null,
  filterKeyword: '',
  filterBrands: () => { },
  filter: () => { },
};

const mapDispatchToProps = {
  brandsLoaded,
  filter,
};

const mapStateToProps = createStructuredSelector({
  filterBrands: selectors.filterBrands(),
  filterKeyword: selectors.selectFilterKeyword(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

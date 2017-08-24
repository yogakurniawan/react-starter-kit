import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Header, Loader } from 'semantic-ui-react';
import WallpaperCard from '../../components/WallpaperCard';
import Pagination from '../../components/Pagination';
import { PER_PAGE } from '../../constants/index';
import { saveItem } from '../../utils/common';
import * as selectors from './selectors';

class BasePage extends Component { // eslint-disable-line react/prefer-stateless-function

  onImageClick = (wallpaper) => {
    const { categories, category } = this.props;
    let thisCategory = category.name;
    if (!thisCategory) {
      thisCategory = categories.find(item => item.id === wallpaper.categoryId).name;
    }

    saveItem('selectedWallpaper', { ...wallpaper, category: thisCategory });
  }

  render() {
    const { wallpapers, page, total, width, category, categoryFromRoute } = this.props;
    let route = category.name;
    if (categoryFromRoute && !route) {
      route = categoryFromRoute.name;
    }
    return (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as="h2" textAlign="center">Cool iPhone Wallpapers</Header>
          </Grid.Column>
        </Grid.Row>
        {
          !wallpapers.length &&
          <Loader
            active
            style={{ marginTop: '50vh' }}
            inline="centered"
          />
        }
        <Grid.Row centered>
          {
            wallpapers.map(wallpaper => (
              <WallpaperCard
                onImageClick={() => this.onImageClick(wallpaper)}
                key={wallpaper.id}
                wallpaper={wallpaper}
              />
            ))
          }
        </Grid.Row>
        {wallpapers.length > 0 && <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Pagination
              screenWidth={width}
              route={route}
              page={page}
              perPage={parseInt(PER_PAGE, 10)}
              total={total}
              setPage={() => { }}
            />
          </Grid.Column>
        </Grid.Row>}
      </Grid>
    );
  }
}

BasePage.propTypes = {
  page: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  categoryFromRoute: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    total: PropTypes.number,
  }),
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]),
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  total: PropTypes.number.isRequired,
  wallpapers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      original: PropTypes.string,
      categoryId: PropTypes.string,
      iphoneModelId: PropTypes.string,
      id: PropTypes.string,
    })).isRequired,
    PropTypes.object,
  ]).isRequired,
};

BasePage.defaultProps = {
  categoryFromRoute: null,
  categories: null,
};

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  width: selectors.selectScreenWidth(),
  category: selectors.selectSelectedCategory(),
  page: selectors.selectPage(),
  total: selectors.selectTotal(),
  categories: selectors.selectCategories(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);

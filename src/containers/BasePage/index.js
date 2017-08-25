import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Loader } from 'semantic-ui-react';
import WallpaperCard from '../../components/WallpaperCard';
import { setSelectedIphoneModel } from '../../actions/global';
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

  onLabelClick = (wallpaper) => {
    const { setIphoneModel } = this.props;
    setIphoneModel(wallpaper.iphoneModelId);
    saveItem('selectedIphoneModel', wallpaper.iphoneModelId);
  }

  render() {
    const { wallpapers } = this.props;
    return (
      <Grid>
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
                onLabelClick={() => this.onLabelClick(wallpaper)}
                onImageClick={() => this.onImageClick(wallpaper)}
                key={wallpaper.id}
                wallpaper={wallpaper}
              />
            ))
          }
        </Grid.Row>
      </Grid>
    );
  }
}

BasePage.propTypes = {
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
  setIphoneModel: PropTypes.func.isRequired,
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
  route: null,
};

const mapDispatchToProps = {
  setIphoneModel: setSelectedIphoneModel,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  category: selectors.selectSelectedCategory(),
  categories: selectors.selectCategories(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);

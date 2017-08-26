import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Loader } from 'semantic-ui-react';
import WallpaperCard from '../../components/WallpaperCard';
import { setSelectedIphoneModel, getIphoneModelById } from '../../actions/global';
import { saveItem } from '../../utils/common';
import * as selectors from './selectors';

class BasePage extends Component { // eslint-disable-line react/prefer-stateless-function

  onImageClick = (wallpaper) => {
    const { categories, category } = this.props;
    let thisCategory = category;
    if (!thisCategory) {
      thisCategory = categories.find(item => item.id === wallpaper.categoryId);
    }

    saveItem('selectedWallpaper', { ...wallpaper, category: thisCategory.name });
  }

  onLabelClick = (wallpaper) => {
    const { setIphoneModel, selectedIphoneModel, getIphoneModel } = this.props;
    if (selectedIphoneModel !== wallpaper.iphoneModelId) {
      setIphoneModel(wallpaper.iphoneModelId);
      getIphoneModel({ id: wallpaper.iphoneModelId });
    }
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
  }),
  selectedIphoneModel: PropTypes.string,
  setIphoneModel: PropTypes.func.isRequired,
  getIphoneModel: PropTypes.func.isRequired,
  wallpapers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      code: PropTypes.string,
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
  category: null,
  selectedIphoneModel: null,
};

const mapDispatchToProps = {
  setIphoneModel: setSelectedIphoneModel,
  getIphoneModel: getIphoneModelById,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  category: selectors.selectSelectedCategory(),
  categories: selectors.selectCategories(),
  selectedIphoneModel: selectors.selectSelectedIphoneModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(BasePage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Loader } from 'semantic-ui-react';
import { getWallpapers } from 'actions/wallpaper';
import WallpaperCard from '../../components/WallpaperCard';
import Pagination from '../../components/Pagination';
import * as selectors from './selectors';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const loadWallpapers = this.props.getWallpapers;
    loadWallpapers(1);
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
        {
          wallpapers.map(wallpaper => (
            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
          ))
        }
        {wallpapers.length && <Grid.Row columns={1}>
          <Grid.Column textAlign="center">
            <Pagination
              page={3}
              perPage={5}
              total={20}
              setPage={() => { }}
            />
          </Grid.Column>
        </Grid.Row>}
      </Grid>
    );
  }
}

Home.propTypes = {
  getWallpapers: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  getWallpapers,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

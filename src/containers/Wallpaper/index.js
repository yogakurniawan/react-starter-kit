import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Breadcrumb, Grid, Image } from 'semantic-ui-react';
import { loadItem } from '../../utils/common';
import history from '../../history';
// import * as selectors from '../BasePage/selectors';

class Wallpaper extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    if (!wallpaperFromStorage) {
      history.push('/');
    }
  }

  componentWillReceiveProps() {
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    if (!wallpaperFromStorage) {
      history.push('/');
    }
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
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    return (
      <Grid>
        <Grid.Row centered style={{ borderBottom: '1px solid #e1e4e8' }}>
          <Grid.Column width={12}>
            <Breadcrumb>
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section link>Store</Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>T-Shirt</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Image
              centered
              src={wallpaperFromStorage.original}
              size="medium"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Wallpaper.propTypes = {
};

Wallpaper.defaultProps = {
};

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);

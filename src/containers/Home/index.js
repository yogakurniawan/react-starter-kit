import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getWallpapers } from 'actions/wallpaper';
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
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

Home.propTypes = {
  getWallpapers: PropTypes.func.isRequired,
};

Home.defaultProps = {
};

const mapDispatchToProps = {
  getWallpapers,
};

const mapStateToProps = createStructuredSelector({
  selectWallpapers: selectors.selectWallpapers(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from 'semantic-ui-react';
// import * as selectors from './selectors';

class Wallpaper extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // console.log(this.props.name);
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
      <Grid>
        <Grid.Column textAlign="center">
          Hello World
        </Grid.Column>
      </Grid>
    );
  }
}

Wallpaper.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);

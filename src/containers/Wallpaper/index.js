import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Breadcrumb, Button, Card, Grid, Header, Icon, Image } from 'semantic-ui-react';
import { loadItem } from '../../utils/common';
import history from '../../history';
import Link from '../../components/Link';
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

  download = (url) => {
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = url;
    tempLink.setAttribute('download', '');
    tempLink.setAttribute('target', '_blank');
    document.body.appendChild(tempLink);
    tempLink.click();
  }

  render() {
    const wallpaper = loadItem('selectedWallpaper');
    return (
      <Grid>
        <Grid.Row centered style={{ borderBottom: '1px solid #e1e4e8' }}>
          <Grid.Column width={14}>
            <Breadcrumb size="tiny">
              <Link to="/" component={Breadcrumb.Section}>Home</Link>
              <Breadcrumb.Divider icon="right angle" />
              <Link to={`/${wallpaper.category}`} component={Breadcrumb.Section}>{wallpaper.category}</Link>
              <Breadcrumb.Divider icon="right angle" />
              <Breadcrumb.Section active>{wallpaper.name}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={12}>
            <Header textAlign="center" as="h2">{wallpaper.name}</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={4}>
            <Button fluid color="green" onClick={() => this.download(wallpaper.original)}>
              <Icon name="cloud download" />Download Wallpaper
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Card
              centered
              raised
              image={wallpaper.original}
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

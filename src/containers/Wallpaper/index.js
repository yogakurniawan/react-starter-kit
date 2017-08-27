import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Breadcrumb, Popup, Image, Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
import { loadItem, saveItem, replaceSpaceWithDash } from '../../utils/common';
import history from '../../history';
import { PER_PAGE } from '../../constants/index';
import Link from '../../components/Link';
import * as wallpaperActions from '../../actions/wallpaper';
import * as selectors from '../BasePage/selectors';

class Wallpaper extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const { getWallpapersByCategory, wallpapers } = this.props;
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    const totalPage = wallpaperFromStorage.total / PER_PAGE;
    if (!wallpaperFromStorage) {
      history.push('/');
    }
    if (!wallpapers.size) {
      getWallpapersByCategory({
        page: Math.floor(Math.random() * totalPage) + 1,
        category: {
          id: wallpaperFromStorage.categoryId,
          name: wallpaperFromStorage.category,
        },
      });
    }
  }

  componentWillReceiveProps() {
    const wallpaperFromStorage = loadItem('selectedWallpaper');
    if (!wallpaperFromStorage) {
      history.push('/');
    }
  }

  onClick = (wallpaper) => {
    const selectedWallpaper = loadItem('selectedWallpaper');
    saveItem('selectedWallpaper', { ...selectedWallpaper, ...wallpaper });
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
    const { width, wallpapers } = this.props;
    const wallpaper = loadItem('selectedWallpaper');
    const name = wallpaper.name.length > 20 ?
    `${wallpaper.name.substring(0, 20)} ...` : wallpaper.name;
    const theWallpapers = wallpapers.filter(item => item.id !== wallpaper.id).slice(0, 10);
    return (
      <div>
        <Grid>
          <Grid.Row centered style={{ borderBottom: '1px solid #e1e4e8' }}>
            <Grid.Column mobile={16} tablet={14} computer={14}>
              <Breadcrumb size="tiny">
                <Link to="/" component={Breadcrumb.Section}>Home</Link>
                <Breadcrumb.Divider icon="right angle" />
                <Link to={`/category/${wallpaper.category}`} component={Breadcrumb.Section}>{wallpaper.category}</Link>
                <Breadcrumb.Divider icon="right angle" />
                <Breadcrumb.Section active>
                  {width <= 414 ? name : wallpaper.name}
                </Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Header textAlign="center" as="h2">{wallpaper.name}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column mobile={16} tablet={6} computer={4}>
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
        <Grid style={{ width: '80%', margin: '20px auto 0 auto' }}>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Header textAlign="center" as="h3">{`More ${wallpaper.category} iPhone Wallpapers`}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            {
              theWallpapers.map(wall => (
                <Grid.Column
                  key={Math.random()}
                  style={{ marginBottom: 15, paddingRight: 20, paddingLeft: 20 }}
                  mobile={8}
                  tablet={4}
                  computer={3}
                >
                  <Popup
                    position="bottom center"
                    trigger={
                      <Link
                        onClick={() => this.onClick(wall)}
                        to={`/wallpaper/${replaceSpaceWithDash(wall.name)}`}
                        component={Image}
                        centered
                        size="small"
                        src={wall.thumbnail}
                      />
                    }
                    content={wall.name}
                    basic
                  />
                </Grid.Column>
              ))
            }
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Wallpaper.propTypes = {
  width: PropTypes.number.isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
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

Wallpaper.defaultProps = {
  name: null,
};

const mapDispatchToProps = {
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
};

const mapStateToProps = createStructuredSelector({
  wallpapers: selectors.selectWallpapers(),
  width: selectors.selectScreenWidth(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);

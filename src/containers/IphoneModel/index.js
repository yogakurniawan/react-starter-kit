import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Header } from 'semantic-ui-react';
import * as wallpaperActions from 'actions/wallpaper';
import { loadItem } from '../../utils/common';
import Pagination from '../../components/Pagination';
import { PER_PAGE } from '../../constants/index';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class IphoneModel extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    const { params } = props;
    super(props);
    this.state = {
      page: params.pageNumber,
    };
  }

  componentDidMount() {
    const {
      setTotalWallpaper,
      params,
      getWallpapersByIphoneModel,
      selectedIphoneModel,
    } = this.props;
    const { iphoneModel, pageNumber } = params;
    let thisIphoneModel = selectedIphoneModel;
    if (!thisIphoneModel) {
      thisIphoneModel = loadItem('selectedIphoneModel');
    }
    setTotalWallpaper(iphoneModel.total);
    getWallpapersByIphoneModel({
      page: pageNumber,
      modelId: thisIphoneModel,
    });
  }

  componentWillReceiveProps(props) {
    const {
      setTotalWallpaper,
      params,
      selectedIphoneModel,
    } = props;
    const { iphoneModel } = params;
    let thisIphoneModel = selectedIphoneModel;
    if (!thisIphoneModel) {
      thisIphoneModel = loadItem('selectedIphoneModel');
    }
    setTotalWallpaper(iphoneModel.total);
  }

  goToPage = (page) => {
    const { getWallpapersByIphoneModel, selectedIphoneModel } = this.props;
    this.setState({ page: parseInt(page, 10) });
    getWallpapersByIphoneModel({
      page,
      modelId: selectedIphoneModel,
    });
  }

  render() {
    const { params, total, width, wallpapers } = this.props;
    const { page } = this.state;
    const route = `model/${params.iphoneModel.name}`;
    return (
      <div>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">{`${params.iphoneModel.name} Wallpapers`}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BasePage />
        <Grid>
          {wallpapers.length > 0 && <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Pagination
                screenWidth={width}
                route={route}
                page={page}
                perPage={parseInt(PER_PAGE, 10)}
                total={total}
                setPage={this.goToPage}
              />
            </Grid.Column>
          </Grid.Row>}
        </Grid>
      </div>
    );
  }
}

IphoneModel.propTypes = {
  total: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  selectedIphoneModel: PropTypes.string,
  getWallpapersByIphoneModel: PropTypes.func.isRequired,
  setTotalWallpaper: PropTypes.func.isRequired,
  params: PropTypes.shape({
    category: PropTypes.object,
    pageNumber: PropTypes.number,
  }),
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

IphoneModel.defaultProps = {
  params: null,
  selectedIphoneModel: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  getWallpapersByIphoneModel: wallpaperActions.getWallpapersByIphoneModel,
  setTotalWallpaper: wallpaperActions.setTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  width: selectors.selectScreenWidth(),
  wallpapers: selectors.selectWallpapers(),
  total: selectors.selectTotal(),
  selectedIphoneModel: selectors.selectSelectedIphoneModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(IphoneModel);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { createStructuredSelector } from 'reselect';
import { Grid, Header } from 'semantic-ui-react';
import * as wallpaperActions from 'actions/wallpaper';
import * as categoryActions from '../../actions/category';
import { setSelectedIphoneModel } from '../../actions/global';
import { replaceDashWithSpace } from '../../utils/common';
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
      setIphoneModel,
      selectIphoneModel,
      setSelectedCategory,
    } = this.props;
    const { iphoneModel, pageNumber } = params;
    let modelId = selectedIphoneModel;
    if (!modelId) {
      const route = iphoneModel.route;
      modelId = route.substring(route.lastIndexOf('-') + 1);
      setIphoneModel(modelId);
    }

    let thisIphoneModel = selectIphoneModel;
    if (Immutable.Map.isMap(thisIphoneModel)) {
      thisIphoneModel = thisIphoneModel.toObject();
    }
    setTotalWallpaper(thisIphoneModel.total_wallpaper);
    getWallpapersByIphoneModel({
      page: pageNumber,
      modelId,
    });
    setSelectedCategory(null);
  }

  componentWillReceiveProps(props) {
    const {
      setTotalWallpaper,
      selectIphoneModel,
      params,
      getWallpapersByIphoneModel,
    } = props;
    let thisIphoneModel = selectIphoneModel;
    if (Immutable.Map.isMap(thisIphoneModel)) {
      thisIphoneModel = thisIphoneModel.toObject();
    }
    if (thisIphoneModel) {
      setTotalWallpaper(thisIphoneModel.total_wallpaper);
    }
    if (params.pageNumber !== this.state.page) {
      getWallpapersByIphoneModel({
        page: params.pageNumber,
        modelId: selectIphoneModel.id,
      });
      this.setState({ page: params.pageNumber });
    }
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
    const { selectIphoneModel, params, total, width, wallpapers } = this.props;
    const { page } = this.state;
    const route = `model/${params.iphoneModel.route}`;
    let iphoneModel = !selectIphoneModel ? params.iphoneModel : selectIphoneModel;
    if (Immutable.Map.isMap(iphoneModel)) {
      iphoneModel = iphoneModel.toObject();
    }
    return (
      <div>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">{`${replaceDashWithSpace(iphoneModel.name)} Wallpapers`}</Header>
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
  selectIphoneModel: PropTypes.shape({
    name: PropTypes.string,
    total_wallpaper: PropTypes.number,
    code: PropTypes.string,
    id: PropTypes.string,
  }),
  selectedIphoneModel: PropTypes.string,
  getWallpapersByIphoneModel: PropTypes.func.isRequired,
  setTotalWallpaper: PropTypes.func.isRequired,
  setIphoneModel: PropTypes.func.isRequired,
  params: PropTypes.shape({
    category: PropTypes.object,
    pageNumber: PropTypes.number,
  }),
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
  setSelectedCategory: PropTypes.func.isRequired,
};

IphoneModel.defaultProps = {
  params: null,
  selectedIphoneModel: null,
  selectIphoneModel: null,
};

const mapDispatchToProps = {
  setSelectedCategory: categoryActions.setSelectedCategory,
  setIphoneModel: setSelectedIphoneModel,
  setPage: wallpaperActions.setPage,
  getWallpapersByIphoneModel: wallpaperActions.getWallpapersByIphoneModel,
  setTotalWallpaper: wallpaperActions.setTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  width: selectors.selectScreenWidth(),
  wallpapers: selectors.selectWallpapers(),
  total: selectors.selectTotal(),
  selectIphoneModel: selectors.selectIphoneModel(),
  selectedIphoneModel: selectors.selectSelectedIphoneModel(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(IphoneModel);

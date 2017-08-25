import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Header } from 'semantic-ui-react';
import * as wallpaperActions from 'actions/wallpaper';
import Pagination from '../../components/Pagination';
import { PER_PAGE } from '../../constants/index';
import BasePage from '../BasePage';
import * as selectors from '../BasePage/selectors';

class Category extends Component { // eslint-disable-line react/prefer-stateless-function
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
      category,
      params,
      getWallpapersByCategory,
    } = this.props;
    const { page } = this.state;
    const thisCategory = category.name ? category : params.category;
    setTotalWallpaper(thisCategory.total);
    getWallpapersByCategory({
      page,
      category: category.name ? category : params.category,
    });
  }

  componentWillReceiveProps(props) {
    const {
      setTotalWallpaper,
      category,
      params,
    } = props;
    const { page } = this.state;
    this.setState({ page: parseInt(page, 10) });
    const thisCategory = category.name ? category : params.category;
    setTotalWallpaper(thisCategory.total);
    if (category.name !== params.category.name) {
      this.setState({ page: 1 });
    }
  }

  goToPage = (page) => {
    const {
      category,
      params,
      getWallpapersByCategory,
    } = this.props;
    this.setState({ page: parseInt(page, 10) });
    getWallpapersByCategory({
      page,
      category: category.name ? category : params.category,
    });
  };

  render() {
    const { category, params, total, width, wallpapers } = this.props;
    const { page } = this.state;
    const categoryFromRoute = params.category;
    let route = category.name;
    if (categoryFromRoute && !route) {
      route = categoryFromRoute.name;
    }
    return (
      <div>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">{`${route} Wallpapers`}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BasePage />
        <Grid>
          {wallpapers.length > 0 && <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Pagination
                screenWidth={width}
                route={`category/${route}`}
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

Category.propTypes = {
  total: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
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

Category.defaultProps = {
  params: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
  setTotalWallpaper: wallpaperActions.setTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  width: selectors.selectScreenWidth(),
  wallpapers: selectors.selectWallpapers(),
  category: selectors.selectSelectedCategory(),
  total: selectors.selectTotal(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Category);

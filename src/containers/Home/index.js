import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Header } from 'semantic-ui-react';
import * as wallpaperActions from 'actions/wallpaper';
import BasePage from '../BasePage';
import Pagination from '../../components/Pagination';
import { PER_PAGE } from '../../constants/index';
import * as selectors from '../BasePage/selectors';

class Home extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    const { params } = props;
    super(props);
    this.state = {
      page: params.pageNumber,
    };
  }

  componentDidMount() {
    const {
      total,
      getWallpapers,
      getTotalWallpaper,
    } = this.props;
    const { page } = this.state;
    if (total === 0) {
      getTotalWallpaper();
    }
    getWallpapers({ page });
  }

  componentWillReceiveProps(props) {
    const {
      total,
      getTotalWallpaper,
    } = props;
    if (total === 0) {
      getTotalWallpaper();
    }
  }

  goToPage = (page) => {
    const {
      getWallpapers,
    } = this.props;
    this.setState({ page: parseInt(page, 10) });
    getWallpapers({ page });
  }

  render() {
    const { total, width, wallpapers } = this.props;
    const { page } = this.state;
    return (
      <div>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Header as="h2" textAlign="center">Cool iPhone Wallpapers</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <BasePage />
        <Grid>
          {wallpapers.length > 0 && <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Pagination
                screenWidth={width}
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

Home.propTypes = {
  width: PropTypes.number.isRequired,
  getWallpapers: PropTypes.func.isRequired,
  getTotalWallpaper: PropTypes.func.isRequired,
  params: PropTypes.shape({
    pageNumber: PropTypes.number,
  }),
  total: PropTypes.number.isRequired,
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

Home.defaultProps = {
  params: null,
};

const mapDispatchToProps = {
  getWallpapers: wallpaperActions.getWallpapers,
  getTotalWallpaper: wallpaperActions.getTotalWallpaper,
};

const mapStateToProps = createStructuredSelector({
  width: selectors.selectScreenWidth(),
  page: selectors.selectPage(),
  wallpapers: selectors.selectWallpapers(),
  total: selectors.selectTotal(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Home);

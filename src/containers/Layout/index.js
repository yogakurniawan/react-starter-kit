import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dimensions from 'react-sizer';
import { createStructuredSelector } from 'reselect';
import * as globalActions from '../../actions/global';
import * as categoryActions from '../../actions/category';
import * as wallpaperActions from '../../actions/wallpaper';
import BaseLayout from '../../components/BaseLayout';
import * as selectors from '../BasePage/selectors';

class Layout extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: props.activeCategory,
    };
  }

  componentDidMount() {
    const {
      selectCategories,
      categories,
      loadCategoriesSuccess,
      width,
    } = this.props;
    if (!selectCategories.size && categories) {
      loadCategoriesSuccess(categories);
    }
    this.props.setScreenSize(width);
  }

  componentWillReceiveProps(props) {
    this.props.setScreenSize(props.width);
  }

  handleCategoryClick = ({ name, id }) => {
    const {
      setSelectedCategory,
      setWallpapers,
      categories,
      getWallpapersByCategory,
    } = this.props;
    const thisCategory = categories.find(item => item.id === id);
    this.setState({ activeCategory: name });
    setWallpapers([]);
    setSelectedCategory({ name, id, total: thisCategory.total_wallpaper });
    getWallpapersByCategory({
      page: 1,
      category: thisCategory,
    });
  }

  render() {
    const { children, categories, showCategories, activeCategory } = this.props;
    let thisActiveCategory = activeCategory;
    if (!thisActiveCategory) {
      thisActiveCategory = this.state.activeCategory;
    }
    return (
      <BaseLayout
        showCategories={showCategories}
        activeCategory={thisActiveCategory}
        onCategoryClick={this.handleCategoryClick}
        categories={categories}
      >
        {children}
      </BaseLayout>
    );
  }
}

Layout.propTypes = {
  activeCategory: PropTypes.string,
  showCategories: PropTypes.bool,
  loadCategoriesSuccess: PropTypes.func.isRequired,
  setWallpapers: PropTypes.func.isRequired,
  getWallpapersByCategory: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]),
  selectCategories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      total_wallpaper: PropTypes.number,
    })),
    PropTypes.object,
  ]).isRequired,
  setScreenSize: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

Layout.defaultProps = {
  params: null,
  activeCategory: null,
  categories: null,
  showCategories: true,
};

const mapDispatchToProps = {
  getWallpapersByCategory: wallpaperActions.getWallpapersByCategory,
  setPage: wallpaperActions.setPage,
  setWallpapers: wallpaperActions.setWallpapers,
  loadCategoriesSuccess: categoryActions.loadCategoriesSuccess,
  getCategoryByName: categoryActions.getCategoryByName,
  setSelectedCategory: categoryActions.setSelectedCategory,
  setScreenSize: globalActions.setScreenSize,
};

const mapStateToProps = createStructuredSelector({
  selectCategories: selectors.selectCategories(),
});

const enhancedLayout = Dimensions()(Layout);

export default connect(mapStateToProps, mapDispatchToProps)(enhancedLayout);

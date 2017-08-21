import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dimensions from 'react-sizer';
import { createStructuredSelector } from 'reselect';
import * as globalActions from '../../actions/global';
import * as categoryActions from '../../actions/category';
import * as wallpaperActions from '../../actions/wallpaper';
import BaseLayout from '../../components/BaseLayout';

class Layout extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: props.activeCategory,
    };
  }

  componentDidMount() {
    const {
      // params,
      // getCategoryByName,
      categories,
      loadCategoriesSuccess,
      // category,
    } = this.props;
    // if (!category.name && params.category) {
      // getCategoryByName(params.category);
    // }
    loadCategoriesSuccess(categories);
  }

  componentWillReceiveProps(props) {
    this.props.setScreenSize(props.width);
  }

  handleCategoryClick = ({ name, id }) => {
    const {
      setSelectedCategory,
      setPage,
      loadWallpapersSuccess,
      categories,
    } = this.props;
    const thisCategory = categories.find(item => item.id === id);
    setPage(0);
    this.setState({ activeCategory: name });
    loadWallpapersSuccess([]);
    setSelectedCategory({ name, id, total: thisCategory.total_wallpaper });
  }

  render() {
    const { children, categories, activeCategory } = this.props;
    let thisActiveCategory = activeCategory;
    if (!thisActiveCategory) {
      thisActiveCategory = this.state.activeCategory;
    }
    return (
      <BaseLayout
        activeCategory={thisActiveCategory}
        onCategoryClick={this.handleCategoryClick}
        menuItems={categories}
      >
        {children}
      </BaseLayout>
    );
  }
}

Layout.propTypes = {
  activeCategory: PropTypes.string,
  loadCategoriesSuccess: PropTypes.func.isRequired,
  loadWallpapersSuccess: PropTypes.func.isRequired,
  // getCategoryByName: PropTypes.func.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
  setScreenSize: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  // params: PropTypes.shape({
    // category: PropTypes.string,
    // pageNumber: PropTypes.number
  // }),
  // category: PropTypes.shape({
    // name: PropTypes.string,
    // id: PropTypes.string,
  // }).isRequired,
};

Layout.defaultProps = {
  params: null,
  activeCategory: null,
};

const mapDispatchToProps = {
  setPage: wallpaperActions.setPage,
  loadWallpapersSuccess: wallpaperActions.loadWallpapersSuccess,
  loadCategoriesSuccess: categoryActions.loadCategoriesSuccess,
  getCategoryByName: categoryActions.getCategoryByName,
  setSelectedCategory: categoryActions.setSelectedCategory,
  setScreenSize: globalActions.setScreenSize,
};

const mapStateToProps = createStructuredSelector({
  // category: selectors.selectSelectedCategory(),
});

const enhancedLayout = Dimensions()(Layout);

export default connect(mapStateToProps, mapDispatchToProps)(enhancedLayout);

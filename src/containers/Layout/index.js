import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dimensions from 'react-sizer';
import setScreenSize from '../../actions/global';
import { loadCategoriesSuccess } from 'actions/category';
import BaseLayout from '../../components/BaseLayout';

class Layout extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const setCategories = this.props.loadCategoriesSuccess;
    setCategories(this.props.categories);
  }

  componentWillReceiveProps(props) {
    this.props.setScreenSize(props.width);
  }

  render() {
    const { children, categories } = this.props;
    return (
      <BaseLayout menuItems={categories}>
        {children}
      </BaseLayout>
    );
  }
}

Layout.propTypes = {
  loadCategoriesSuccess: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
  setScreenSize: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  loadCategoriesSuccess,
  setScreenSize,
};

const enhancedLayout = Dimensions()(Layout);

export default connect(null, mapDispatchToProps)(enhancedLayout);

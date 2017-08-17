import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCategories } from 'actions/category';
import BaseLayout from '../../components/BaseLayout';
import * as selectors from './selectors';

class Layout extends Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const loadCategories = this.props.getCategories;
    loadCategories();
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
  getCategories: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
};

const mapDispatchToProps = {
  getCategories,
};

const mapStateToProps = createStructuredSelector({
  categories: selectors.selectCategories(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BaseLayout.css';
import BaseHeader from '../BaseHeader';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <BaseHeader />
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(s)(Layout);

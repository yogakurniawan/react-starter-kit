import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BaseLayout.css';
import BaseHeader from '../BaseHeader';
import Theme from '../../utils/theme';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <div>
          <BaseHeader />
          {this.props.children}
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(Layout);

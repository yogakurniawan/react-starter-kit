import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'semantic-ui-react';
import s from './BaseLayout.css';
import ChildrenWrapper from './ChildrenWrapper';
import BaseHeader from '../BaseHeader';
import VerticalMenu from '../VerticalMenu';
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
          <ChildrenWrapper>
            <Grid>
              <Grid.Column mobile={16} tablet={4} computer={3}>
                <VerticalMenu />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={12} computer={13}>
                {this.props.children}
              </Grid.Column>
            </Grid>
          </ChildrenWrapper>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(Layout);

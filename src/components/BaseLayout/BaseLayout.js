import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Dimensions from 'react-sizer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'semantic-ui-react';
import s from './BaseLayout.css';
import ChildrenWrapper from './ChildrenWrapper';
import BaseHeader from '../BaseHeader';
import VerticalMenu from '../VerticalMenu';
import Theme from '../../utils/theme';

class Layout extends React.Component {
  render() {
    const { width, categories, onCategoryClick, activeCategory } = this.props;
    const isMobileOrTablet = width <= 1024;
    const isSmallMobile = width <= 320;
    return (
      <ThemeProvider theme={Theme}>
        <div>
          <BaseHeader
            isMobileOrTablet={isMobileOrTablet}
            categories={categories}
            miniHeader={isSmallMobile}
          />
          <ChildrenWrapper>
            <Grid>
              {!isMobileOrTablet && categories &&
                <Grid.Column style={{ paddingRight: 0 }} mobile={16} tablet={4} computer={3}>
                  <VerticalMenu
                    activeCategory={activeCategory}
                    onCategoryClick={onCategoryClick}
                    menuItems={categories}
                  />
                </Grid.Column>}
              {!isMobileOrTablet &&
                <Grid.Column
                  mobile={16}
                  tablet={categories ? 12 : 16}
                  computer={categories ? 13 : 16}
                >
                  {this.props.children}
                </Grid.Column>}
              {isMobileOrTablet && <Grid.Column mobile={16} tablet={16} computer={16}>
                {this.props.children}
              </Grid.Column>}
            </Grid>
          </ChildrenWrapper>
        </div>
      </ThemeProvider>
    );
  }
}

Layout.propTypes = {
  width: PropTypes.number.isRequired,
  activeCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  categories: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]),
};

Layout.defaultProps = {
  activeCategory: null,
  categories: null,
};

const enhancedLayout = Dimensions()(Layout);

export default withStyles(s)(enhancedLayout);

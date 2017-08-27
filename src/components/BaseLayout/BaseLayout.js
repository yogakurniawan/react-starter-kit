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
    const { width, categories, showCategories, onCategoryClick, activeCategory } = this.props;
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
              {!isMobileOrTablet && showCategories &&
                <Grid.Column mobile={16} tablet={4} computer={4}>
                  <VerticalMenu
                    activeCategory={activeCategory}
                    onCategoryClick={onCategoryClick}
                    menuItems={categories}
                  />
                </Grid.Column>}
              {!isMobileOrTablet &&
                <Grid.Column
                  mobile={16}
                  tablet={showCategories ? 12 : 16}
                  computer={showCategories ? 12 : 16}
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
  showCategories: PropTypes.bool,
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
  showCategories: true,
};

const enhancedLayout = Dimensions()(Layout);

export default withStyles(s)(enhancedLayout);

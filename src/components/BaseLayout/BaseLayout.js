import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Dimensions from 'react-sizer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid, Dropdown } from 'semantic-ui-react';
import s from './BaseLayout.css';
import ChildrenWrapper from './ChildrenWrapper';
import BaseHeader from '../BaseHeader';
import VerticalMenu from '../VerticalMenu';
import Theme from '../../utils/theme';

class Layout extends React.Component {
  render() {
    const { width, menuItems, onCategoryClick, activeCategory } = this.props;
    const isMobileOrTablet = width <= 1024;
    const isSmallMobile = width <= 320;
    const categories = menuItems.map(item => ({
      key: item.id,
      value: item.name,
      text: item.name,
    }));
    return (
      <ThemeProvider theme={Theme}>
        <div>
          <BaseHeader
            categories={menuItems}
            miniHeader={isSmallMobile}
          />
          <ChildrenWrapper>
            <Grid>
              {!isMobileOrTablet && <Grid.Column mobile={16} tablet={4} computer={3}>
                <VerticalMenu
                  activeCategory={activeCategory}
                  onCategoryClick={onCategoryClick}
                  menuItems={menuItems}
                />
              </Grid.Column>}
              {!isMobileOrTablet && <Grid.Column mobile={16} tablet={12} computer={13}>
                {this.props.children}
              </Grid.Column>}
              {isMobileOrTablet && <Grid.Column width={16}>
                <Dropdown fluid placeholder="Categories" search selection options={categories} />
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
  menuItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]).isRequired,
};

Layout.defaultProps = {
  activeCategory: null,
};

const enhancedLayout = Dimensions()(Layout);

export default withStyles(s)(enhancedLayout);

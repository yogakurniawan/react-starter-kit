import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Dimensions from 'react-sizer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid, Sidebar, Segment, Menu } from 'semantic-ui-react';
import s from './BaseLayout.css';
import ChildrenWrapper from './ChildrenWrapper';
import BaseHeader from '../BaseHeader';
import VerticalMenu from '../VerticalMenu';
import Theme from '../../utils/theme';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state;
    const { width } = this.props;
    const isMobile = width <= 414;
    return (
      <ThemeProvider theme={Theme}>
        <div>
          <BaseHeader displaySidebar={isMobile} toggleSidebar={this.toggleVisibility} />
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
              <Menu.Item name="home">
                Home
                </Menu.Item>
              <Menu.Item name="gamepad">
                Games
                </Menu.Item>
              <Menu.Item name="camera">
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <ChildrenWrapper>
                <Grid>
                  {!isMobile && <Grid.Column mobile={16} tablet={4} computer={3}>
                    <VerticalMenu />
                  </Grid.Column>}
                  {!isMobile && <Grid.Column mobile={16} tablet={12} computer={13}>
                    {this.props.children}
                  </Grid.Column>}
                  {isMobile && <Grid.Column mobile={16} tablet={16} computer={16}>
                    {this.props.children}
                  </Grid.Column>}
                </Grid>
              </ChildrenWrapper>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </ThemeProvider>
    );
  }
}

Layout.propTypes = {
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

const enhancedLayout = Dimensions()(Layout);

export default withStyles(s)(enhancedLayout);

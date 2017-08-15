import React from 'react';
import PropTypes from 'prop-types';
import { Input, Menu, Icon } from 'semantic-ui-react';

class Header extends React.Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { toggleSidebar, displaySidebar } = this.props;
    return (
      <Menu size="tiny" fixed="top" floated>
        {displaySidebar && <Menu.Item>
          <Icon onClick={toggleSidebar} style={{ margin: 0, cursor: 'pointer' }} name="sidebar" size="large" />
        </Menu.Item>}
        <Menu.Item>
          <h4>Logo</h4>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  displaySidebar: PropTypes.bool.isRequired,
};

export default Header;

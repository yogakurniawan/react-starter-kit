import React from 'react';
import { Input, Menu, Icon } from 'semantic-ui-react';

class Header extends React.Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <Menu size="tiny" fixed="top" stackable>
        <Menu.Item>
          <Icon style={{ margin: 0 }} name="sidebar" size="large" />
        </Menu.Item>
        <Menu.Item>
          <h4>Logo</h4>
        </Menu.Item>
        <Menu.Menu position="left">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;

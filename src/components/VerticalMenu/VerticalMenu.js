import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export default class VerticalMenu extends Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem, menuItems } = this.props;
    if (!menuItems.length) {
      return (
        <Menu vertical>
          <Menu.Item
            name="Loading"
          >
            Loading...
          </Menu.Item>
        </Menu>
      );
    }
    return (
      <Menu vertical>
        {
          menuItems.map(item => (
            <Menu.Item
              key={item.name}
              name={item.name}
              active={activeItem === item.name}
              onClick={this.handleItemClick}
            >
              {item.name}
            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
}

VerticalMenu.propTypes = {
  menuItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]),
  activeItem: PropTypes.string,
};

VerticalMenu.defaultProps = {
  menuItems: [],
  activeItem: null,
};


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Header, Label } from 'semantic-ui-react';
import { replaceSpaceWithDash } from '../../utils/common';
import Link from '../../components/Link';

export default class VerticalMenu extends Component {
  handleItemClick = (event) => {
    event.stopPropagation();
    const id = event.currentTarget.dataset.id;
    const { onClick } = this.props;
    onClick({ id });
  };

  render() {
    const { menuItems, activeItem, title, name } = this.props;
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
      <div style={{ marginTop: 25 }}>
        <Header as="h4">{title}</Header>
        <Menu vertical>
          {
            menuItems.map(item => (
              <Link
                to={`/${name}/${replaceSpaceWithDash(item.name)}`}
                key={item.name}
                data-id={item.id}
                active={activeItem === item.name}
                onClick={this.handleItemClick}
                component={Menu.Item}
              >
                {
                  activeItem === item.name &&
                    <Label color="teal">{item.total_wallpaper}</Label>
                }
                {
                  activeItem !== item.name &&
                    <Label>{item.total_wallpaper}</Label>
                }
                {item.name}
              </Link>
            ))
          }
        </Menu>
      </div>
    );
  }
}

VerticalMenu.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  activeItem: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  menuItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]),
};

VerticalMenu.defaultProps = {
  menuItems: [],
  title: null,
  name: null,
  activeItem: null,
};

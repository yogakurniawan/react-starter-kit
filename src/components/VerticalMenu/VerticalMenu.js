import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Header, Label } from 'semantic-ui-react';
import Link from '../../components/Link';

export default class VerticalMenu extends Component {
  handleItemClick = (event) => {
    event.stopPropagation();
    const name = event.currentTarget.dataset.name;
    const id = event.currentTarget.dataset.id;
    const { onCategoryClick } = this.props;
    onCategoryClick({ name, id });
    this.setState({ activeItem: name });
  };

  render() {
    const { menuItems, activeCategory } = this.props;
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
        <Header size="medium">Categories</Header>
        <Menu vertical>
          {
            menuItems.map(item => (
              <Link
                to={`/category/${item.name}`}
                key={item.name}
                data-name={item.name}
                data-id={item.id}
                active={activeCategory === item.name}
                onClick={this.handleItemClick}
                component={Menu.Item}
              >
                {
                  activeCategory === item.name &&
                    <Label color="teal">{item.total_wallpaper}</Label>
                }
                {
                  activeCategory !== item.name &&
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
  menuItems: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    PropTypes.object,
  ]),
  activeCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
};

VerticalMenu.defaultProps = {
  menuItems: [],
  activeCategory: null,
};

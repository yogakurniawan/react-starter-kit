import React from 'react';
import PropTypes from 'prop-types';
import { Input, Menu } from 'semantic-ui-react';

class Header extends React.Component {
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { miniHeader } = this.props;
    return (
      <Menu size={miniHeader ? 'mini' : 'tiny'} fixed="top" floated>
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
  miniHeader: PropTypes.bool.isRequired,
};

export default Header;

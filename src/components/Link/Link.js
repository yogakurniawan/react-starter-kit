/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func,
    component: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onClick: null,
    children: null,
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { component, to, children, ...props } = this.props;
    const ComponentToRender = component;
    if (children) {
      return (
        <ComponentToRender
          href={to}
          {...props}
          onClick={this.handleClick}
        >
          {children}
        </ComponentToRender>
      );
    }
    return (
      <ComponentToRender
        href={to}
        {...props}
        onClick={this.handleClick}
      />
    );
  }
}

export default Link;

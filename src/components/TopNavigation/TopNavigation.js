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
import { Row, Col } from 'react-flexbox-grid';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaChevronLeft } from 'react-icons/lib/fa/';
import s from './TopNavigation.css';

function Component({ title, subTitle, onClick }) {
  return (
    <div className={s.wrapper}>
      <Row center="xs">
        <Col xs={12} sm={9} md={8} lg={8}>
          {onClick && <FaChevronLeft onClick={onClick} size={22} />}
          <span><h1 className={s.h1}>{title}</h1></span>
          <p className={s.p}>{subTitle}</p>
        </Col>
      </Row>
    </div>
  );
}

Component.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
};

Component.defaultProps = {
  title: '',
  subTitle: '',
  onClick: () => {},
};

export default withStyles(s)(Component);

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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FaChevronLeft } from 'react-icons/lib/fa/';
import s from './TopNavigation.css';

function Component({ title, subTitle, onClick }) {
  return (
    <div className={s.wrapper}>
      <div className="row center-xs">
        <div className="col-xs-12 col-sm-9 col-md-8 col-lg-8">
          {onClick && <FaChevronLeft onClick={onClick} size={22} />}
          <span><h1 className={s.h1}>{title}</h1></span>
          <p className={s.p}>{subTitle}</p>
        </div>
      </div>
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

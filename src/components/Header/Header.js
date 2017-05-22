/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Logo from './PhoneCataloguesLogo.svg';

class Header extends React.Component {
  render() {
    return (
      <div className={s.fixedHeaderContainer}>
        <div className={s.headerWrapper}>
          <header>
            <Link to="/">
              <img src={Logo} alt="React" />
            </Link>
            <div className={s.navigationWrapper}>
              <nav>
                <ul className={s.ulWrapper}>
                  <li className={s.liWrapper}>
                    <Link to="/">
                      Home
                    </Link>
                  </li>
                  <li className={s.liWrapper}>
                    <Link to="/reviews">
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);

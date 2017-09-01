import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'react-flexbox-grid';
import s from './Filter.css';

function Component({ onChange }) {
  return (
    <Row className={s.wrapper} start="xs">
      <Col xs={12} sm={6} md={4} lg={4} className={s.inputGroup}>
        <input className={s.input} onChange={onChange} type="search" placeholder="Filter Brand" />
        <span className={`${s.inputGroupButton} fa fa-search`} />
      </Col>
    </Row>
  );
}

Component.propTypes = {
  onChange: PropTypes.func,
};

Component.defaultProps = {
  onChange: () => {},
};

export default withStyles(s)(Component);

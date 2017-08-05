import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-styled-flexboxgrid';
import H1 from './H1';
import P from './P';
import Wrapper from './Wrapper';

function Component({ title, subTitle }) {
  return (
    <Wrapper>
      <Row center="xs">
        <Col xs={12} sm={9} md={8} lg={8}>
          <span><H1>{title}</H1></span>
          <P>{subTitle}</P>
        </Col>
      </Row>
    </Wrapper>
  );
}

Component.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

Component.defaultProps = {
  title: '',
  subTitle: '',
};

export default Component;

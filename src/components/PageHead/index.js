import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-styled-flexboxgrid';
import { capitalizeFirstLetter } from 'utils/common';
import Wrapper from './Wrapper';
import HeaderLink from './HeaderLink';
import NavBar from './NavBar';
import ArrowRight from './ArrowRight';

function Component(props) {
  return (
    <Wrapper>
      <Row center="xs">
        <Col xs={12} sm={9} md={9} lg={8}>
          <NavBar>
            {
              props.links.length && props.links.map((link, index) =>
                (
                  <span key={`${link.text}`}>
                    {link.href && <HeaderLink to={link.href}>
                      {link.text && capitalizeFirstLetter(link.text)}
                    </HeaderLink>}
                    {!link.href && <HeaderLink>
                      {link.text && capitalizeFirstLetter(link.text)}
                    </HeaderLink>}
                    {index < (props.links.length - 1) && <ArrowRight className="fa fa-chevron-right" aria-hidden />}
                  </span>
                ),
              )
            }
          </NavBar>
        </Col>
      </Row>
    </Wrapper>
  );
}

Component.propTypes = {
  links: PropTypes.array.isRequired,
};

export default Component;

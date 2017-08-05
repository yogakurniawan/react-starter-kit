import React, { PropTypes } from 'react';
import Input from './Input';
import InputGroupButton from './InputGroupButton';
import InputGroup from './InputGroup';
import Wrapper from './Wrapper';

function Component({ onChange }) {
  return (
    <Wrapper start="xs">
      <InputGroup xs={12} sm={6} md={4} lg={4}>
        <Input onChange={onChange} type="search" placeholder="Filter Brand" />
        <InputGroupButton className="fa fa-search" />
      </InputGroup>
    </Wrapper>
  );
}

Component.propTypes = {
  onChange: PropTypes.func,
};

Component.defaultProps = {
  onChange: () => {},
};

export default Component;

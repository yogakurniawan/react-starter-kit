import styled from 'styled-components';

const Input = styled.input`
  color: #2c3e50;
  border-color: transparent;
  background-color: #f9f9f9;
  height: 35px;
  border-radius: 5px;
  padding: 5px 10px 5px 30px;
  line-height: 1.4;
  border: 2px solid #bdc3c7;
  font-size: 1em;
  width: 100%;
  &:focus {
    border-color: #dd5555;
    color: #dd5555;
    outline: 0;
    box-shadow: none;
  }
`;

export default Input;

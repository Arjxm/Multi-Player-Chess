import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  padding: 10px 20px;
  background-color: #337ab7;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #23527c;
  }
`;

const Button = (props: any) => {
  return <Btn onClick={props.onClick}>{props.btn}</Btn>;
};

export default Button;

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
interface btnData{
    onClick: (event: React.FormEvent) => void; 
    btn: string;
}
const Button: React.FC<btnData> = ({onClick, btn}) => {
  return <Btn onClick={onClick}>{btn}</Btn>;
};

export default Button;

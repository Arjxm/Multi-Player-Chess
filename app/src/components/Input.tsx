
import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
interface inputType{
    lable: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type:string;
}
const Input:React.FC<inputType> = ({lable, onChange, value, type}) => {
  return (
    <InputContainer>
      <InputLabel>{lable}</InputLabel>
      <InputField onChange = {onChange} value = {value} type = {type}/>
    </InputContainer>
  );
};

export default Input;

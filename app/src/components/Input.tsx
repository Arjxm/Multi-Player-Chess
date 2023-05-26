
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

const Input = (props: any) => {
  return (
    <InputContainer>
      <InputLabel>{props.l}</InputLabel>
      <InputField {...props} />
    </InputContainer>
  );
};

export default Input;

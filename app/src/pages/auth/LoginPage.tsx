import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootState} from '../../utils/store';
import { useSelector, useDispatch } from 'react-redux'
import { setEmail, setPassCode } from '../../utils/slice/userSlice';
import {Link} from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    dispatch(setEmail(email));
  };

  const handlePassCodeChange = (event: any) => {
    const passCode = event.target.value;
    dispatch(setPassCode(passCode));
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
   
    }
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input l = "Email or username" type = "email" onChange = {handleEmailChange} />
        <Input l = "Passcode" type = "password" onChange = {handlePassCodeChange}/>
        <Button onClick = {handleSubmit} btn = "Login"/>
      </form>

      <Link to = '/signup'>sign up</Link>
    </FormContainer>
  );
};

export default LoginPage;

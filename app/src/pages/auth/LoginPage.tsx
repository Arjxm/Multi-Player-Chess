import styled from 'styled-components';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RootState} from '../../utils/store';
import { useSelector, useDispatch } from 'react-redux'
import { setEmail, setOnline, setPassCode, setUserName } from '../../utils/slice/userSlice';
import {Link} from "react-router-dom";
import axios from 'axios';
import {setPanel} from '../../utils/slice/appSlice';
import {BASE_URL} from "../../utils/apiUrl";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;


const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const app = useSelector((state:RootState) => state.app);

  const dispatch = useDispatch();

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    dispatch(setEmail(email));
  };

  const handlePassCodeChange = (event: any) => {
    const passCode = event.target.value;
    dispatch(setPassCode(passCode));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
        const res = await axios.post(`${BASE_URL}/api/auth/login`, {email: user.email, passCode: user.passCode} );
        if(res.status === 200){
           dispatch(setOnline(true))
           dispatch(setUserName(res.data.userName));
            console.log(res.data);
            console.log(user)
        }
    }
  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input l = "Email or username" type = "email" value = {user.email} onChange = {handleEmailChange} />
        <Input l = "Passcode" type = "password" value = {user.passCode} onChange = {handlePassCodeChange}/>
        <Button onClick = {handleSubmit} btn = "Login"/>
      </form>

      <p onClick={(e) => {dispatch(setPanel(1))}}>sign up</p>
    </FormContainer>
  );
};

// @ts-ignore
export default LoginPage;

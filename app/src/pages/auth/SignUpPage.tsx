import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {setPanel} from "../../utils/slice/appSlice";
import {
  setEmail,
  setOnline,
  setPassCode,
  setUserName,
} from "../../utils/slice/userSlice";
import { RootState } from "../../utils/store";
import {BASE_URL} from "../../utils/apiUrl";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const SignUpPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const app = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    dispatch(setEmail(email));
  };

  const handlePassCodeChange = (event: any) => {
    const passCode = event.target.value;
    dispatch(setPassCode(passCode));
  };

  const handleUserName = (event: any) => {
    const userName = event.target.value;
    dispatch(setUserName(userName));
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await axios.post(`${BASE_URL}/api/auth/signUp`, {
      email: user.email,
      passCode: user.passCode,
      userName: user.userName,
    });
    if (res.status === 201) {
      dispatch(setOnline(true));
      console.log(res.data);
      console.log(user);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input l="Email" type="email" value = {user.email} onChange = {handleEmailChange}/>
        <Input l="name" type="text" value = {user.userName} onChange = {handleUserName} />
        <Input l="Passcode" type="password" value = {user.passCode} onChange = {handlePassCodeChange} />
        <Button onClick={handleSubmit} btn="SignUp" />
      </form>
      <p onClick = {() => dispatch(setPanel(0))}>log in</p>
    </FormContainer>
  );
};

// @ts-ignore
export default SignUpPage;

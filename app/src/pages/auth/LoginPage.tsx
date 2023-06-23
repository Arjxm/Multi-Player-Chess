import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { RootState } from "../../utils/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  setOnline,
  setPassCode,
  setUserName,
} from "../../utils/slice/userSlice";
import axios from "axios";
import { setPanel } from "../../utils/slice/appSlice";
import { useCookies } from "react-cookie";
import { ChangeEvent, FormEvent, useEffect } from "react";
// import {BASE_URL} from "../../utils/apiUrl";


//Toast
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "http://localhost:5000";
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user);
  useSelector((state: RootState) => state.app);

  const [cookies, setCookies] = useCookies(["user"]);

  const dispatch = useDispatch();

  const handleEmailChange = ( event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    dispatch(setEmail(email));
  };

  const handlePassCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const passCode = event.target.value;
    console.log(passCode)
    dispatch(setPassCode(passCode));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: user.email,
      passCode: user.passCode,
    });
    if (res.status === 200) {
      dispatch(setOnline(true));
      dispatch(setUserName(res.data.userName));
    }else{
        
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          lable="Email or username"
          type="email"
          value={user.email}
          onChange={handleEmailChange}
        />
        <Input
          lable="Passcode"
          type="password"
          value={user.passCode}
          onChange={handlePassCodeChange}
        />
        <Button onClick={handleSubmit} btn="Login" />
      </form>

      <p
        onClick={() => {
          dispatch(setPanel(1));
        }}
      >
        sign up
      </p>
    </FormContainer>
  );
};

export default LoginPage;

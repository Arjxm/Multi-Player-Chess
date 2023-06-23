import {useState} from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import Button from "../../components/Button";
import Chessboard from "../../components/ChessBoard";
import {socket} from "../../utils/socket/socket";
import { RootState } from "../../utils/store";
import LoginPage from "../auth/LoginPage";
import SignUpPage from "../auth/SignUpPage";

const Main = styled.div`
  display: flex;
  justifycontent: space-between;
  alignitems: centre;
`;

const Wrapper = styled.div`
padding: 32px;,
`; 

const AuthPanel = () => {
    const app = useSelector((state:RootState) => state.app)
    if(app.panel === 0){
        return <LoginPage />
    }else{
        return <SignUpPage />
    }
}

const Home = () => {

  const user = useSelector((state: RootState) => state.user);

  return (
    <Main>
      <Wrapper>
        <Chessboard/>
      </Wrapper>
      <Wrapper>
        {user.online ? (
          <Button
            btn="Play with friend"
            onClick={() => {
              console.log("room created");
            }}
          />
        ) : (
          <AuthPanel />
        )}
      </Wrapper>
    </Main>
  );
};

export default Home;

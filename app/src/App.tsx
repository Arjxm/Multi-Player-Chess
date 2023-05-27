import axios from "axios";
import "./App.css";
import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {socket} from "./utils/socket/socket";


function App() {
   
  return(
  <BrowserRouter>
    <Routes>
        <Route path='/' element = {<ChessBoard/>}/>
        <Route path = 'login' element={<LoginPage/>}/>
        <Route path = 'signup' element={<SignUpPage/>}/>
    </Routes>
  </BrowserRouter>

        );
}

export default App;

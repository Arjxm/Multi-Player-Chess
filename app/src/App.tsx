import axios from "axios";
import "./App.css";
import { useState } from "react";
import ChessBoard from "./components/ChessBoard";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  const [data, setData] = useState(null);

  axios.get("http://localhost:5000/").then((res) => {
    setData(res.data.message);
  });
  return(
  <BrowserRouter>
    <Routes>
        <Route path = "/login" element={<LoginPage/>}/>
    </Routes>
  </BrowserRouter>

        );
}

export default App;

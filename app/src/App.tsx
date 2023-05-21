import axios from 'axios';
import './App.css';
import {useState} from "react";


function App() {
    const[data, setData] = useState(null);

    axios.get("http://localhost:5000/").then(res => {

                setData(res.data.message);
            })
  return (
    <div className="App">
        {data}
    </div>
  );
}

export default App;

import axios from 'axios';
import './App.css';

function App() {

    axios.get("http://localhost:5000/").then(res => {
            console.log(res);
            })
  return (
    <div className="App"> 
    </div>
  );
}

export default App;

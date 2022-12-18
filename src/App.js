import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
function App() {
     
  return (
    <div className="App wrapper">
      <h1 className='footer'>TO DO LIST</h1>
      <h6 className=''>By Shivam Singhal</h6>
      {<Login/>}
      
    </div>
  );
}

export default App;

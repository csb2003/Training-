import { useEffect, useState } from 'react';
import Login from './login'
import Dashboard from './dashboard';


function App() {
  const [message, setMessage] = useState('');
  const [isloggedIn,setIsloggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleLoginSucess = (name)=>{
    setIsloggedIn(true)
    setUsername(name)
  }
  const handlelogout = (isloggedIn) =>{
    setIsloggedIn(false)
    setUsername('')
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return(
    <>
    {
      isloggedIn? (<Dashboard name ={username} onLogout = {handlelogout}/>) : <Login onLoginSuccess = {handleLoginSucess}></Login> 
    } 
      
    </>
  ) 

}

export default App;

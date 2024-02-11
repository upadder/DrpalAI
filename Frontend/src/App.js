import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Login from './components/login/login';
import './App.css';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  // let client = require('~/client_secret.json');
  return (
    <GoogleOAuthProvider clientId= "970850734399-gb219lo9k7e42f8oqmnnbggfm5du6qjk.apps.googleusercontent.com">
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Home" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
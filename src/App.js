import React, { useState, useEffect } from 'react';
import './App.css'
import UserContext from './context/usercontext'
import Routes from './routes'
import jwt from 'jsonwebtoken'
import {
  BrowserRouter as Roteador
} from "react-router-dom";
import { getToken } from './config/auth';



function App() {

  const [loggedUser, setLoggedUser] = useState({})

  const getUserFromToken = async () => {
    try {
      const { user } = await jwt.decode(getToken())
      setLoggedUser(user)
    } catch (error) {
      setLoggedUser({})
    }

  }

  useEffect(() => {
    getUserFromToken()
    return () => { }
  }, [])

  return (
    <React.Fragment>
      <Roteador>
        <UserContext.Provider value={{ usuarioLogado: loggedUser, setUsuarioLogado: setLoggedUser }}>
          <Routes />
        </UserContext.Provider>
      </Roteador>
    </React.Fragment >
  );
}

export default App;

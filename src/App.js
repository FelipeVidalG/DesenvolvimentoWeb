import React, { createContext, useState } from 'react';

import { BrowserRouter, Route } from "react-router-dom";

import Home from './paginas/Home';
import Contato from './paginas/Contato';
import Sobre from './paginas/Sobre';
import Login from './paginas/Inicial/Login'
import Cadastro from "./paginas/Inicial/Cadastro";

import './App.css';

export const AuthContext = createContext({})

const App = () => {
  const [session, setSession] = useState({});
  
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{session, setSession}}>
        <Route exact={true} path="/" component={Login} />
        <Route exact={true} path="/home" component={Home} />
        <Route exact={true} path="/sobre" component={Sobre} />
        <Route exact={true} path="/contato" component={Contato} />
        <Route exact={true} path="/cadastro" component={Cadastro} />
      </AuthContext.Provider>
    </BrowserRouter>
  )
}


export default App;

import React, { Component } from "react";
import {Link} from 'react-router-dom'

import fb from '../../../config/Firebase'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
    }

    this.logar = this.logar.bind(this);
  }

  async logar() {
    await fb.auth().signInWithEmailAndPassword(this.state.usuario, this.state.senha)
      .then(async (value) => {

      })
  }

  componentDidMount() {
    fb.auth().onAuthStateChanged((user) => {

      if (user) {
        this.setState({ mensagem: "Você está logado" })
      } else {
        this.setState({ mensagem: "Voce não esta logado" })
      }
    });
  }

  render() {
    return (
      <div>
        <h1> Tela de login : {this.state.mensagem} </h1>

        <div className="main">
          <div className="dvInputs">
            <input type="text" placeholder="Usuário" onChange={(e) => this.setState({ usuario: e.target.value })} />
            <input type="password" placeholder="Senha" onChange={(e) => this.setState({ senha: e.target.value })} />
          </div>
          <div className="dvBotoes">
            <Link to='/cadastro'>Cadastrar</Link> 
            <button onClick={this.logar}> Logar </button>
          </div>
        </div>
      </div>
    )
  }

}

export default Login
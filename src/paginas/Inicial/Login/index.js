import React, { Component } from "react";
import { Link } from 'react-router-dom'

import 'bulma/css/bulma.min.css'
import './index.css'

import fb from '../../../config/Firebase'
import { Logo } from "../../../componentes/Logo";

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
      <div className="flex">
        <aside>
          <div>
            <Logo />
          </div>
        </aside>
        <main>
          <section className="section">
            <div className="container center">
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title title is-4 login">
                    Login
                  </p>
                </header>
                <div className="card-content">
                  <div className="content">
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text"  />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Senha</label>
                      <p className="control has-icons-left">
                        <input className="input" type="password"  />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>

                    <div className="columns is-justify-content-space-between">
                      <div className="field column is-grouped mt-5">
                        <div className="control">
                          <Link to="/cadastro">
                            <button className="button is-light btn-outline">
                              Cadastre-se
                            </button>
                          </Link>
                        </div>
                      </div>
                      <div className="field column is-grouped mt-5 flex-end">
                        <div className="control">
                          <button className="button botao-laranja">Login</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

}

export default Login




//<input className="input is-success" type="text" placeholder="@NomeDeUsuario"/>
//<p className="help is-success">This username is available</p>
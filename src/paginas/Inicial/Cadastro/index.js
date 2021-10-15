import React, { Component } from "react";
import { Link } from 'react-router-dom'

import 'bulma/css/bulma.min.css'
import './index.css'

import fb from '../../../config/Firebase'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }

  }



  render() {
    return (
      <div>
        <section className="section center">
          <div className="container ">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title title is-4">
                  Login
                </p>
              </header>
              <div className="card-content">
                <div className="content">

                  <div className="field">
                    <label className="label">Nome</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Nome" />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Sobrenome</label>
                    <div className="control">
                      <input className="input" type="text" placeholder="Sobrenome" />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                      <input className="input" type="text" placeholder="@username" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                      <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                  <label className="label">Senha</label>
                    <p className="control has-icons-left">
                      <input className="input" type="password" placeholder="password"/>
                      <span className ="icon is-small is-left">
                      <i className ="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field">
                  <label className="label">Confirmar senha</label>
                    <p className="control has-icons-left">
                      <input className="input" type="password" placeholder="password"/>
                      <span className ="icon is-small is-left">
                      <i className ="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>

                  <div classNameName="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                      <input className="input" type="email" placeholder="example@email.com" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mt-3">
                    <label className="label">Data de nascimento</label>
                    <div className="control has-icons-left">
                      <input className="input date unstyled" type="text" placeholder="dd/mm/aaaa"/>
                      <span className="icon is-small is-left">
                        <i class="fas fa-calendar-minus"></i>
                      </span>
                    </div>
                  </div>

                  <div className="columns is-justify-content-space-between">
                    <div className="field column is-grouped mt-5">
                      <div className="control">
                        <button className="button is-light btn-outline">Cadastre-se</button>
                      </div>
                    </div>
                    <div className="field column is-grouped mt-5 flex-end">
                      <div className="control">
                        <button className="button is-primary">Enviar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

}

export default Login




//<input className="input is-success" type="text" placeholder="@NomeDeUsuario"/>
//<p className="help is-success">This username is available</p>
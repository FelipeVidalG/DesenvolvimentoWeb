/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import 'bulma/css/bulma.min.css'
import './index.css'
import logoCabecalho from "../../imagens/logoCabecalho.png"
import { Link } from "react-router-dom";


function Cabecalho() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/home">
            <img src={logoCabecalho} className="logoCabecalho" alt="logo" />
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/home">
              Tela inicial
            </Link>

            <Link className="navbar-item" to='/cadastro'>
              Perfil
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Mais
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  Convites
                </a>
                <a className="navbar-item">
                  Avaliação
                </a>
                <a className="navbar-item">
                  Entre em contato
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                  Reporte um problema
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <Link className="button is-secondary margin-right" to="/festa/criar">Criar festa</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Cabecalho;
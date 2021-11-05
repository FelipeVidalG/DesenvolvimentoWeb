import React from "react";
import 'bulma/css/bulma.min.css'
import './index.css'
import logoCabecalho from "../../imagens/logoCabecalho.png"


function Cabecalho() {
    return(
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="#">
    <img src={logoCabecalho} className="logoCabecalho" alt="logo" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item">
        Tela inicial
      </a>

      <a className="navbar-item">
        Perfil
      </a>

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
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Reporte um problema
          </a>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
      </div>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Cabecalho;
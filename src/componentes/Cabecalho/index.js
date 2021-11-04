import React from "react";
import 'bulma/css/bulma.min.css'
import './index.css'
import logoCabecalho from "../../imagens/logoCabecalho.png"


function Cabecalho() {
    return(
        <div>
            <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#">
    <img src={logoCabecalho} className="logoCabecalho" alt="logo" />
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Tela inicial
      </a>

      <a class="navbar-item">
        Perfil
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          Mais
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            Convites
          </a>
          <a class="navbar-item">
            Avaliação
          </a>
          <a class="navbar-item">
            Entre em contato
          </a>
          <hr class="navbar-divider"/>
          <a class="navbar-item">
            Reporte um problema
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
      </div>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Cabecalho;
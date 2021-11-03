import react from "react";
import 'bulma/css/bulma.min.css'
import './index.css'
import { Logo } from "../Logo";
import logoCabecalho from "../../imagens/logoCabecalho.png"


function Cabecalho() {
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <button classNames="navbar-item" href="#">
            <img src={logoCabecalho} className="logo" alt="logo" />
          </button>

          <button class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div className="navbar-start">
            <button className="navbar-item">
              Tela inicial
            </button>

            <button className="navbar-item">
              Perfil
            </button>

            <div class="navbar-item has-dropdown is-hoverable">
              <button className="navbar-link">
                Mais
              </button>

              <div classNameass="navbar-dropdown">
                <button className="navbar-item">
                  Convites
                </button>
                <button className="navbar-item">
                  Avaliação
                </button>
                <button className="navbar-item">
                  Entre em contato
                </button>
                <hr className="navbar-divider" />
                <button className="navbar-item">
                  Reporte um problema
                </button>
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
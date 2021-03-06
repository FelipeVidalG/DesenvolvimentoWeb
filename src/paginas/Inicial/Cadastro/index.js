import React, { useState, useContext, useEffect } from "react";
import DateInput from "../../../Util/date-mask";
import 'bulma/css/bulma.min.css'
import Cabecalho from "../../../componentes/Cabecalho";
import './index.css'
import { firebase } from "../../../config/Firebase";

import UsuarioPadrao from '../../../imagens/usuario.jpg'

import { AuthContext } from '../../../App'

const Cadastro = () => {
  const { session, setSession } = useContext(AuthContext)

  const [date, setDate] = useState();
  const [imagemURL, setImagemURL] = useState();

  function dateState() {
    var elm = document.querySelector(".input-date-mask");
    setDate(elm.value);
  }

  const dateProps = {
    className: "input date unstyled input-date-mask",
    onChange: dateState
  }

  async function enviaArquivo(e) {
    let arquivo = e.target.files[0];
    await firebase.storage().ref("usuario").child(session.uid).put(arquivo)
      .then((e) => {
        console.log("Upload feito!")
      });

    await firebase.storage().ref("usuario").child(session.uid).getDownloadURL()
      .then((url) => {
        setImagemURL(url)
      });
  }

  useEffect(() => {
    console.log(session);
    if(Object.keys(session).length > 0){
      const storage = firebase.storage().ref("usuario").child(session.uid).getDownloadURL()
      storage.then(url => {setImagemURL(url)})
    }else{
      setImagemURL(UsuarioPadrao)
    }
  }, [])



  return (
    <div className="flex">
      <Cabecalho />
      <section className="section w-620">
        <div className="container">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title title is-4">
                Cadastro
              </p>
            </header>
            <div className="card-content">
              <div className="content">

                <div className="columns">

                  <div className="column">
                    <div className="field mt-3">
                      <label className="label">Data de nascimento</label>
                      <div className="control has-icons-left">
                        {DateInput(dateProps)}
                        <span className="icon is-small is-left">
                          <i className="fas fa-calendar-minus"></i>
                        </span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Fale sobre voc??</label>
                      <div className="control">
                        <textarea className="textarea" placeholder="Fale sobre voc??"></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="file is-info has-name column">
                    <img src={imagemURL} width='200' className="imgDir" alt="" />
                    <label className="file-label textCenter">
                      <input className="file-input" type="file" name="resume" onChange={(e) => { enviaArquivo(e) }} />
                      <span className="file-cta">
                        <span className="file-label textCenter">
                          Selecione sua foto
                        </span>
                      </span>
                    </label>
                  </div>

                </div>

                <div className="columns is-justify-content-space-between">
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

export default Cadastro
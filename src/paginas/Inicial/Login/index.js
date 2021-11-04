import React from "react";

import './index.css'

import { auth, firebase } from '../../../config/Firebase'
import { Logo } from "../../../componentes/Logo";
import GoogleIconImg from '../../../imagens/google-icon.svg'
import Festa1 from '../../../imagens/festa1.jpg'
import Festa2 from '../../../imagens/festa2.jpg'
import { useHistory } from "react-router";


function Login() {
  const provider = new firebase.auth.GoogleAuthProvider()
  const history = useHistory()

  async function logar() {
    await auth.signInWithPopup(provider)
      .then((user) => {
        if(user){
          history.push("/home")
        }
      })
  }

  return (
    <div>
      <div className="grid">
        <div className="img-festa">
          <img src={Festa1} alt="Festa" />
        </div>
        <div>
          <div className="logo-img">
            <Logo />
          </div>
          <div className="center">
            <button onClick={logar} className="create-room">
              <img src={GoogleIconImg} alt="Logo do Google" />
              <p>Entre com sua conta do Google</p>
            </button>
          </div>
        </div>
        <div className="img-festa">
          <img src={Festa2} alt="Festa" />
        </div>
      </div>
    </div>
  )


}

export default Login




//<input className="input is-success" type="text" placeholder="@NomeDeUsuario"/>
//<p className="help is-success">This username is available</p>
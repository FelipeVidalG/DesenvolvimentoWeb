import React, { useContext } from "react";

import './index.css'

import { auth, firestore, firebase } from '../../../config/Firebase'
import { Logo } from "../../../componentes/Logo";
import GoogleIconImg from '../../../imagens/google-icon.svg'
import Festa1 from '../../../imagens/festa1.jpg'
import Festa2 from '../../../imagens/festa2.jpg'
import { useHistory } from "react-router";

import {AuthContext} from '../../../App'


function Login() {
  const {session, setSession} = useContext(AuthContext)
  const provider = new firebase.auth.GoogleAuthProvider()
  const history = useHistory()
    

  function createUser(rs){

    const usuario = {
      nome: rs.user.displayName,
      email: rs.user.email
    }

    firestore.collection("usuarios").doc(rs.user.uid).set(usuario)

    setSession({...usuario, uid: rs.user.uid})
  }

  function findUser(rs){

    const usuario = firestore.collection("usuarios").doc(rs.user.uid);
    usuario.get().then(doc =>{
    
      setSession({...doc.data(), uid: rs.user.uid})
    
    }).catch(err =>{console.log(err)})
    
  }

  async function logar() {
    await auth.signInWithPopup(provider)
      .then((rs) => {
        
        if(rs.additionalUserInfo.isNewUser){
          createUser(rs);
        }else{
          findUser(rs)
        }


        if(rs.user){
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
import React, { Component } from 'react';
import firebase from './config/Firebase';
import './App.css';

class App extends Component{

    constructor(props){
      super(props);
      this.state = {
        usuario: "",
        senha: ""
      }
      this.logar = this.logar.bind(this);
    this.deslogar = this.deslogar.bind(this);
     this.cadastrar = this.cadastrar.bind(this);
      //this.listar = this.listar.bind(this);
    }
/*

    listar(){
      firebase.collection('usuario').get()
      .then((snapshot)=>{
          let lista = [];
          snapshot.forEach((item)=>{
            lista.push({
              id: item.id,
              nome: item.data().nome,
              sobrenome: item.data().sobrenome
            });
          });
          console.log(lista);
          this.setState({usuario: lista});
      });
    }

    componentDidMount(){
      firebase.collection('usuario').onSnapshot((snapshot)=>{
          let lista = [];
          snapshot.forEach((item)=>{
            lista.push({
              id: item.id,
              nome: item.data().nome,
              sobrenome: item.data().sobrenome
            });
          });
          console.log(lista);
          this.setState({usuario: lista});
      });
    }
    */

    async cadastrar(){
    await firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.senha)
    .then(()=>{
      console.log("Cadastrou!");
    })
    .catch((error) => {
      if(error.code === "auth/weak-password"){
        alert("Senha fraca!")
      }
      else if(error.code === "auth/email-already-in-use"){
        alert("Email já está sendo usado!")
      }

    });
    }

    async logar(){
      await firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.senha);
    }

    async deslogar(){
      await firebase.auth().signOut();
    }

    componentDidMount(){
     firebase.auth().onAuthStateChanged((user)=>{
      
      if(user) {
        this.setState({mensagem: "Você está logado"})
      }
    });
  } 
     
     

    render(){
      return(
        <div>


        <h1> Tela de login : {this.state.mensagem} </h1>

      <input type="text" placeholder="Usuário" onChange= {(e)=> this.setState({usuario: e.target.value})} /> <br/>
      <input type="password" placeholder="Senha" onChange= {(e)=> this.setState({senha: e.target.value})} /> <br/>

      <button onClick= {this.cadastrar}> Cadastrar</button>
      <button onClick= {this.deslogar}> Deslogar </button>
      <button onClick= {this.logar}> Logar </button>

      <br/>

      {this.state.usuario + ':' + this.state.senha}

        </div>
      )
    }

}




export default App;

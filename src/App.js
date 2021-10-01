import React, { Component } from 'react';
import firebase from './config/Firebase';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
      mensagem: "",
      nome: "",
      dataNascimento: "",
      cpf: ""
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

  async cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.senha)
      .then(async (value) => {

        await firebase.firestore().collection("usuario").doc(value.user.uid)
          .set({
            nome: this.state.nome,
            dataNascimento: this.state.dataNascimento,
            cpf: this.state.cpf,
          })

      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Senha fraca!")
        }
        else if (error.code === "auth/email-already-in-use") {
          alert("Email já está sendo usado!")
        }

      });
  }

  async logar() {
    await firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.senha)
    .then(async (value) => {
      
      await firebase.firestore().collection("usuario").doc(value.user.uid)
      .get()
      .then((snapshot)=>{

        let state = this.state;
        state.nome = snapshot.data().nome;
        state.cpf  = snapshot.data().cpf;
        state.dataNascimento = snapshot.data().dataNascimento;

        this.setState(state);
      })
      
    })
  }

  async deslogar() {
    await firebase.auth().signOut();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        this.setState({ mensagem: "Você está logado" })
      }
    });
  }



  render() {
    return (
      <div>


        <h1> Tela de login : {this.state.mensagem} </h1>

        <input type="text" placeholder="Usuário" onChange={(e) => this.setState({ usuario: e.target.value })} /> <br />
        <input type="password" placeholder="Senha" onChange={(e) => this.setState({ senha: e.target.value })} /> <br />
        <input type="text" placeholder="Nome" onChange={(e) => this.setState({ nome: e.target.value })} /> <br />
        <input type="text" placeholder="CPF" onChange={(e) => this.setState({ cpf: e.target.value })} /> <br />
        <input type="date" placeholder="Data de Nascimento" onChange={(e) => this.setState({ dataNascimento: e.target.value })} /> <br />


        <button onClick={this.cadastrar}> Cadastrar</button>
        <button onClick={this.deslogar}> Deslogar </button>
        <button onClick={this.logar}> Logar </button>

        <br />

        {this.state.usuario + ':' + this.state.senha}<br/>
        <h5>{this.state.cpf}</h5><br/>
        <h5>{this.state.nome}</h5><br/>
        <h5>{this.state.dataNascimento}</h5>

      </div>
    )
  }

}




export default App;

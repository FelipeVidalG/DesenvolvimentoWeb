import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import Cabecalho from "../../componentes/Cabecalho";
import qrcode from "../../imagens/qrcode.png"
import festaquadrada from "../../imagens/festaquadrada.jpg"
import UsuarioPadrao from '../../imagens/usuario.jpg'
import { firestore, firebase } from '../../config/Firebase'

import './index.css'

function Invite() {
    const params = useParams()
    const festaId = params.id

    const [img, setImg] = useState(festaquadrada)
    const [conv, setConv] = useState()
    const [host, setHost] = useState()
    const [imguser, setImguser] = useState()
    const redirect = useHistory()


    useEffect(() => {
        const festa = firestore.collection("festa").doc(festaId)
        festa.get()
            .then((obj) => {
                const dados = obj.data()
                const userId = dados.host.trim()
                const usuario = firestore.collection("usuarios").doc(userId)
                setConv(dados.capacidade)
                usuario.get().then((user) => {
                    const dadosUser = user.data()
                    setHost(dadosUser.nome)
                })
                const imgUser = firebase.storage().ref("usuario").child(userId).getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        setImguser(url)
                    }).catch(() => {
                        setImguser(UsuarioPadrao)
                    });
            })
    }, [])

    function aceitarConvite() {
        const botoes = document.querySelector(".botoes")
        const text = document.querySelector(".text")
        text.classList.remove("none")
        botoes.style.display = "none"
        setImg(qrcode)
    }

    function recusarConvite() {
        const botoes = document.querySelector(".botoes")
        const textErro = document.querySelector(".textErro")
        textErro.classList.remove("none")
        botoes.style.display = "none"
        setTimeout(() => {
            redirect.push("/home")
        }, 5000)
    }

    return (
        <div className="flex fundo">
            <Cabecalho />
            <section className="section w-300">
                <div className="container">
                    <div className="card card30">
                        <header className="card-header noflex">
                            <div className="end">
                                <div>
                                    <p className="card-header-title title is-4">
                                        Convite
                                    </p>
                                </div>
                                <div>
                                    <img className="imguser" src={imguser} alt=""></img>
                                </div>
                            </div>
                        </header>
                        <div className="card-content">
                            <div className="content">

                                <div>
                                    <h4>Você foi convidado para a festa do(a) {host}</h4>
                                    <h6>{conv} convidados</h6>
                                </div>

                                <div className="columns is-justify-content-space-between">
                                    <div className="field column is-grouped mt-5 flex-end">
                                        <div className="control botoes">
                                            <button className="button is-primary" onClick={aceitarConvite}>Aceitar</button>
                                            <button className="button is-danger botao" onClick={recusarConvite}>Recusar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="none text">
                                    <h5 className="colorir">Agora é so escanear o QrCode na entrada e aproveitar.<br />Tenha uma boa festa! </h5>
                                </div>
                                <div className="none textErro">
                                    <h5 className="colorirErro">Infelizmente você recusou a festa do(a) {host}<br /><br />
                                        <span className="black">Iremos te
                                            redirecionar para a tela inicial em 5 segundos!
                                        </span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card30">
                        <div className="card-content">
                            <div className="content">
                                <div>
                                    <img src={img} alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Invite;
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import { firestore } from '../../config/Firebase'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

import { AuthContext } from '../../App'

import 'bulma/css/bulma.min.css'

import './index.css'
import { Link } from "react-router-dom";

function ChangeView({ center }) {
    const map = useMap()
    map.setView(center, 13)
    return null;
}


let arrUsuarios = []
function Home() {
    const { session } = useContext(AuthContext);

    const [festas, setFestas] = useState([])

    const [firstpos, setfirstpos] = useState(['-25.4315658', '-49.2958607'])

    const [selectUser, setSelectUser] = useState()

    const [filtrocidade, setFiltrocidade] = useState("");

    const [filtrohost, setFiltrohost] = useState("");

    async function pesquisaCidade() {

        let arrFestasInicio = [];
        let arrFestasFinal =[];

        if (filtrocidade === "") {

            const collectionFesta = firestore.collection("festa")
            await collectionFesta.get().then(rs => {
                rs.docs.forEach(doc => {
                    let username = ""

                    const usuarioUid = doc.data().host.trim()

                    arrUsuarios.forEach(item => {
                        if (usuarioUid === item.uid) {
                            username = item.nome
                        }
                    })

                    arrFestasInicio.push({ ...doc.data(), nome: username, festaId: doc.id })
                })
            })

        } else {
            const docFesta = firestore.collection("festa")
            await docFesta.get().then(rs => {
                rs.docs.forEach(item => {
                    const objItem = item.data();

                    if (objItem.cidade === filtrocidade) {

                        let username = "";
                        const usuarioUid = objItem.host.trim()

                        arrUsuarios.forEach(item => {
                            if (usuarioUid === item.uid.trim()) {
                                username = item.nome
                            }
                        })
                        arrFestasInicio.push({ ...item.data(), nome: username, festaId: item.id })
                    }
                })
            })
        }

        if (filtrohost === ""){
            arrFestasFinal = arrFestasInicio
        }else{
            arrFestasInicio.forEach(item => {
                if (item.host.trim() === filtrohost.trim()){
                    arrFestasFinal.push(item)
                }
            })
        }
        setFestas(arrFestasFinal)

        const firstFesta = arrFestasFinal[0];

        if (firstFesta) {
            const pos = [firstFesta.latitude, firstFesta.longitude]
            setfirstpos(pos)
        }
    }

    async function carregaUsuarios() {
        await firestore.collection("usuarios").get().then(rs => {
            rs.docs.forEach(doc => {
                const user = { nome: doc.data().nome, uid: doc.id.trim() }
                arrUsuarios.push(user);
            })
        })
    }

    async function carregaSelectHosts() {
        let arrSelectUsuarios = [];

        await firestore.collection("festa").get().then(rs => {
            rs.docs.forEach(doc => {
                const hostUid = doc.data().host.trim()

                let existe = false
                let objUser = {}

                arrUsuarios.forEach(item =>{
                    if(item.uid === hostUid){
                        arrSelectUsuarios.forEach(itemsel =>{
                            if(itemsel.uid === item.uid){
                                existe = true;
                            }
                        })

                        if(!existe){
                            objUser.uid = item.uid
                            objUser.nome = item.nome
                            arrSelectUsuarios.push(objUser)
                        }
                    }
                })
            })
        })
        setSelectUser(arrSelectUsuarios)
    }

    useEffect(() => {
        carregaUsuarios()
        carregaSelectHosts()
        pesquisaCidade("")
    }, [])

    useEffect(() => {
        pesquisaCidade()
    }, [filtrohost, filtrocidade])

    return (
        <div>
            <Cabecalho />
            <div className="map">
                <MapContainer center={firstpos} zoom={13} scrollWheelZoom={true}>
                    <ChangeView center={firstpos} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        !festas[0] || !festas ? null : festas.map(item => {
                            return (
                                <Marker position={[item.latitude, item.longitude]}>
                                    <Popup>
                                        Anfitrião: {item.nome} <br />
                                        Capacidade: {item.capacidade} pessoas <br/>
                                        <Link to={`/invite/${item.festaId}`}>Ir para festa</Link>
                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                </MapContainer>
            </div>

            <div className="container-select">
                <div className="label">Cidade</div>
                <div className="select center-select ">
                    <select className="is-hovered is-focused sel sel-cidade" onChange={e => { setFiltrocidade(e.target.value) }}>
                        <option value="">Todos</option>
                        <option value="curitiba">Curitiba</option>
                        <option value="colombo">Colombo</option>
                        <option value="sao-jose-pinhais">São José dos Pinhais</option>
                    </select>
                </div>
            </div>
            <div className="container-select">
                <div className="label">Anfitriões</div>
                <div className="select center-select">
                    <select className="is-hovered is-focused sel" onChange={e => {setFiltrohost(e.target.value)}}>
                        <option value="">Todos</option>
                        {!selectUser ? null : selectUser.map(item =>{
                            return(
                                <option value={item.uid}>{item.nome}</option>
                            )
                        })}
                    </select>
                </div>
            </div>


        </div>
    )
}

export default Home;
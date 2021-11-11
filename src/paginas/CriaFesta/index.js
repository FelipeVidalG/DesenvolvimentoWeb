import React, { useContext, useEffect, useState } from 'react';
import Cabecalho from '../../componentes/Cabecalho';
import { firestore } from '../../config/Firebase'

import { AuthContext } from '../../App'
import 'bulma/css/bulma.min.css'
import './index.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


function ChangeView({ center }) {
    const map = useMap()
    map.setView(center, 13)
    return null;
}

function Marcador(props) {
    if (!!props.latitude && !!props.longitude) {

        return (
            <Marker position={[props.latitude, props.longitude]}>
                <Popup>
                    É aqui sua festa?
                </Popup>
            </Marker>
        )
    } else {
        return null
    }
}

function CriarFesta() {
    const { session } = useContext(AuthContext);
    const [usuario, setUsuario] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        const usuario = firestore.collection("usuarios").doc(session.uid)
        usuario.get().then(usu => {
            setUsuario(usu.data())
        })
    }, [])

    function mudaLatitude(e) {
        const txtLongitude = document.querySelector(".txtLongitude")
        const longitude = txtLongitude.value
        const latitude = e.target.value

        if (longitude.length > 8 && latitude.length > 8) {
            setLatitude(latitude)
            setLongitude(longitude)
        }

    }

    function mudaLongitude(e) {
        const txtLongitude = document.querySelector(".txtLatitude")
        const longitude = txtLongitude.value
        const latitude = e.target.value

        if (longitude.length > 8 && latitude.length > 8) {
            setLatitude(latitude)
            setLongitude(longitude)
        }

    }

    async function criarFesta(){
        const ddlCidade = document.querySelector(".ddlCidade")
        const txtLatitude = document.querySelector(".txtLatitude")
        const txtLongitude = document.querySelector(".txtLongitude")
        const txtCapacidade = document.querySelector(".txtCapacidade")

        let enviar = true;

        if(ddlCidade.value === ""){
            ddlCidade.classList.add("is-danger")
            enviar = false
        }
        if(txtLatitude.value === ""){
            txtLatitude.classList.add("is-danger")
            enviar = false
        }
        if(txtLongitude.value === ""){
            txtLongitude.classList.add("is-danger")
            enviar = false
        }
        if(txtCapacidade.value === "" || isNaN(txtCapacidade.value)){
            txtCapacidade.classList.add("is-danger")
            enviar = false
        }

        if (enviar){
            const obj = { 
                capacidade: txtCapacidade.value, 
                cidade: ddlCidade.value,
                host: session.uid,
                latitude: txtLatitude.value,
                longitude: txtLongitude.value
            }

            await firestore.collection("festa").doc().set(obj)
        }
    }

    function tiraDanger(e){
        const elm = e.target

        if (elm.classList.contains("is-danger")){
            elm.classList.remove("is-danger")
        }
    }

    return (
        <div>
            <Cabecalho />
            <section className="section w-620">
                <div className="container mtneg">
                    <div className="card card-criarfesta">
                        <header className="card-header">
                            <p className="card-header-title title is-4">
                                Olá &nbsp; <span className="nome">{!usuario ? "Usuario" : usuario.nome} &nbsp;</span> Crie sua festa
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                <div className="columns">
                                    <div className="column is=5">
                                        <div className="field w-input3 mt-3">
                                            <label className="label">Seu email</label>
                                            <input className="input is-primary" type="text" disabled value={!usuario ? "Exemplo@gmail.com" : usuario.email} />
                                        </div>
                                        <label className="label top2">Cidade</label>
                                        <div class="select is-primary">
                                            <select className="ddlCidade" onChange={tiraDanger}>
                                                <option value="curitiba">Curitiba</option>
                                                <option value="colombo">Colombo</option>
                                                <option value="sao-jose-pinhais">São José dos Pinhais</option>
                                            </select>
                                        </div>

                                        <label className="label top ">Localização da festa</label>
                                        <div className="w-input left dFlex">
                                            <span className="span-mr">Latitude</span>
                                            <input className="input is-primary ml txtLatitude" maxLength="11" onChange={e => { mudaLatitude(e); tiraDanger(e) }} type="text" />
                                        </div>
                                        <div className=" w-input left top dFlex">
                                            <span>Longitude</span>
                                            <input className="input is-primary ml txtLongitude " maxLength="11" onChange={e => { mudaLongitude(e) ; tiraDanger(e)}} type="text" />
                                        </div>
                                        <div className="top field w-input2 mt-3">
                                            <label className="label">Capacidade de pessoas</label>
                                            <div className="dFlex">
                                                <input className="input is-primary txtCapacidade" onChange={tiraDanger} type="text" />
                                            </div>
                                        </div>
                                        <div className="is-justify-content-space-between">
                                            <div className="field is-grouped mt-5 flex-end">
                                                <div className="control">
                                                    <button className="button is-primary" onClick={criarFesta}>Criar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="map2 column is-7">
                                        <MapContainer center={[!!latitude ? latitude : '-25.4315658', !!longitude ? longitude : '-49.2958607']} zoom={13} scrollWheelZoom={true}>
                                            <ChangeView center={[!!latitude ? latitude : '-25.4315658', !!longitude ? longitude : '-49.2958607']} />
                                            <TileLayer
                                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marcador latitude={latitude} longitude={longitude} />

                                        </MapContainer>
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

export default CriarFesta
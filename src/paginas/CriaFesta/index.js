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

    function mudaLatitude(e){
        const txtLongitude = document.querySelector(".txtLongitude")
        const longitude = txtLongitude.value
        const latitude = e.target.value

        if(longitude.length > 8 && latitude.length > 8){
            setLatitude(latitude)
            setLongitude(longitude)
        }

    }

    function mudaLongitude(e){
        const txtLongitude = document.querySelector(".txtLatitude")
        const longitude = txtLongitude.value
        const latitude = e.target.value

        if(longitude.length > 8 && latitude.length > 8){
            setLatitude(latitude)
            setLongitude(longitude)
        }

    }

    return (
        <div>
            <Cabecalho />
            <section className="section w-620">
                <div className="container">
                    <div className="card">
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

                                        <label className="label top ">Localização da festa</label>
                                        <div className="w-input left flex">
                                            <span className="span-mr">Latitude</span>
                                            <input className="input is-primary ml txtLatitude" maxLength="11" onChange={e => {mudaLatitude(e)}} type="text" />
                                        </div>
                                        <div className=" w-input left top flex">
                                            <span>Longitude</span>
                                            <input className="input is-primary ml txtLongitude" maxLength="11" onChange={e => {mudaLongitude(e)}} type="text" />
                                        </div>
                                        <div className="top field w-input2 mt-3">
                                            <label className="label">Capacidade de pessoas</label>
                                            <div className="flex">
                                                <input className="input is-primary" type="text" />
                                            </div>
                                        </div>
                                        <div className="is-justify-content-space-between">
                                            <div className="field is-grouped mt-5 flex-end">
                                                <div className="control">
                                                    <button className="button is-primary">Criar</button>
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
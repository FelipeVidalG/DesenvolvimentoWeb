import React from "react";
import {Link} from 'react-router-dom';
import Cabecalho from "../../componentes/Cabecalho";


function Home(){
    return (
        <div>
            <Cabecalho/>
            <h2>Home</h2>


            <Link to="/sobre">Sobre</Link><br/>
            <Link to="/contato">Contato</Link>
        </div>
    )
}

export default Home;
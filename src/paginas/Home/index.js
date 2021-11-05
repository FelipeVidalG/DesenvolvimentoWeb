import React, {useContext} from "react";
import Cabecalho from "../../componentes/Cabecalho";

import {AuthContext} from '../../App'

function Home(){
    const {session, setSession} = useContext(AuthContext)

    return (
        <div>
            <Cabecalho/>
            <h1>{session.uid}</h1>
        </div>
    )
}

export default Home;
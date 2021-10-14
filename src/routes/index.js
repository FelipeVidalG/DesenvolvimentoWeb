import { BrowserRouter, Route } from "react-router-dom";

import Home from '../paginas/Home';
import Contato from '../paginas/Contato';
import Sobre from '../paginas/Sobre';
import Cadastro from '../paginas/Inicial/Cadastro';
import Login from '../paginas/Inicial/Login'



const Rotas = () => {

    return (
        <BrowserRouter>

            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/sobre" component={Sobre} />
            <Route exact={true} path="/contato" component={Contato} />
            <Route exact={true} path="/cadastro" component={Cadastro} />

        </BrowserRouter>
    )



}

export default Rotas;
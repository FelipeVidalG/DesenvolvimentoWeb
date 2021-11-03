import { BrowserRouter, Route } from "react-router-dom";

import Home from '../paginas/Home';
import Contato from '../paginas/Contato';
import Sobre from '../paginas/Sobre';
import Login from '../paginas/Inicial/Login'



const Rotas = () => {

    return (
        <BrowserRouter>

            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/sobre" component={Sobre} />
            <Route exact={true} path="/contato" component={Contato} />

        </BrowserRouter>
    )



}

export default Rotas;
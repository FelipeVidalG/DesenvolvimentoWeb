import { BrowserRouter, Route } from "react-router-dom";
import { Redirect } from "react-router";

import Home from './paginas/Home';
import Contato from './paginas/Contato';
import Sobre from './paginas/Sobre';
import NotFound from './paginas/NotFound';



const Rotas = () => {

    return (
        <BrowserRouter>
        
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/sobre" component={Sobre} />
        <Route exact={true} path="/contato" component={Contato} />
        <Route exact={true} path='*' component={NotFound} />
        
        
        </BrowserRouter>
    )



}

export default Rotas;
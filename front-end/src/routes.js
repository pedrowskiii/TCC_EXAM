import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';



import MainAtendente from './pages/Atendente/main';
import DetalhesAtendente from './pages/Atendente/detalhes';
import CriarAtendente from './pages/Atendente/criar';
import EditarAtendente from './pages/Atendente/editar';
import DeletarAtendente from './pages/Atendente/deletar';

import MainMedico from './pages/Medico/main';
import DetalhesMedico from './pages/Medico/detalhes';
import CriarMedico from './pages/Medico/criar';
import EditarMedico from './pages/Medico/editar';
import DeletarMedico from './pages/Medico/deletar';

import MainCliente from './pages/Cliente/main';
import DetalhesCliente from './pages/Cliente/detalhes';
import CriarCliente from './pages/Cliente/criar';
import EditarCliente from './pages/Cliente/editar';
import DeletarCliente from './pages/Cliente/deletar';

import MainProntuario from './pages/Prontuario/main';
import DetalhesProntuario from './pages/Prontuario/detalhes';
import CriarProntuario from './pages/Prontuario/criar';
import EditarProntuario from './pages/Prontuario/editar';
import DeletarProntuario from './pages/Prontuario/deletar';
import NovoProntuario from './pages/Prontuario/NovoProntuario';




const Routes = () => (
    
    <BrowserRouter>
        <Switch>
                     
            <Route exact path = "/Atendentes" component={MainAtendente} />
            <Route path = "/Atendentes/:id" component={DetalhesAtendente} />
            <Route path = "/criarAtendente" component={CriarAtendente} />
            <Route path = "/editarAtendente/:id" component={EditarAtendente} />
            <Route path = "/deletarAtendente/:id" component={DeletarAtendente} />

            <Route exact path = "/Medicos" component={MainMedico} />
            <Route path = "/Medicos/:id" component={DetalhesMedico} />
            <Route path = "/criarMedico" component={CriarMedico} />
            <Route path = "/editarMedico/:id" component={EditarMedico} />
            <Route path = "/deletarMedico/:id" component={DeletarMedico} />

            <Route exact path = "/Clientes" component={MainCliente} />
            <Route path = "/Clientes/:id" component={DetalhesCliente} />
            <Route path = "/criarCliente" component={CriarCliente} />
            <Route path = "/editarCliente/:id" component={EditarCliente} />
            <Route path = "/deletarCliente/:id" component={DeletarCliente} />


            <Route exact path = "/Prontuarios" component={MainProntuario} />
            <Route path = "/Prontuarios/:id" component={DetalhesProntuario} />
            <Route path = "/criarProntuarios" component={CriarProntuario} />
            <Route path = "/editarProntuario/:id" component={EditarProntuario} />
            <Route path = "/deletarProntuario/:id" component={DeletarProntuario} />
            <Route path = "/novoProntuario/:id" component={NovoProntuario} />


        </Switch>
    </BrowserRouter>
)

export default Routes;
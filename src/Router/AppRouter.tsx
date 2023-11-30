import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroDeClientes from "../Components/CadastroCliente";
import CadastroProfissionais from "../Components/CadastroProfissional";
import CadastroServicos from "../Components/CadastroServico";
import ListagemClientes from "../Components/ListagemCliente";
import ListagemProfissional from "../Components/ListagemProfissional";
import ListagemDeServico from "../Components/ListagemServico";
import EditarCliente from "../Components/EditarClientes";
import EditarProfissional from "../Components/EditarProfissionais";
import EditarServicos from "../Components/EditarServiços";
import RedefinirSenhaProfissionais from "../Components/RedefinirSenhaProfissional";
import RedefinirSenhaClientes from "../Components/RedefinirSenhaCliente";
import ListagemAgenda from "../Components/ListagemAgenda";
import CadastroAgenda from "../Components/CadastroAgenda";
import EditarAgenda from "../Components/EditarAgenda";


const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="CadastroDeClientes" element={<CadastroDeClientes />} />
                <Route path="CadastroDeProfissionais" element={<CadastroProfissionais/>} />
                <Route path="CadastroDeServicos" element={<CadastroServicos/>} />
                <Route path="CadastroDeAgenda" element={<CadastroAgenda/>} />
                <Route path="ListagemDeClientes" element={<ListagemClientes/>} />
                <Route path="ListagemDeProfissional" element={<ListagemProfissional/>} />
                <Route path="ListagemDeServico" element={<ListagemDeServico/>} />
                <Route path="ListagemDeAgenda" element={<ListagemAgenda/>} />
                <Route path="/EditarCliente/:id" element={<EditarCliente/>} />
                <Route path="/EditarProfissional/:id" element={<EditarProfissional/>} />
                <Route path="/EditarServicos/:id" element={<EditarServicos/>} />
                <Route path="/EditarAgenda/:id" element={<EditarAgenda/>} />
                <Route path="/redefinirSenhaClientes" element={<RedefinirSenhaClientes/>} />
                <Route path="/redefinirSenhaProfissionais" element={<RedefinirSenhaProfissionais/>} />
            </Routes>
        </BrowserRouter>
    );

}
export default AppRoute;
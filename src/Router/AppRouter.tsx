import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroAgenda from "../Components/CadastroAgenda";
import CadastroDeClientes from "../components/CadastroClientes";
import CadastroDeProfissionais from "../components/CadastrodeProfissionais";
import CadastroServico from "../components/CadastrodeSevicos";
import EditarClientes from "../components/editarClientes";
import EditarProfissional from "../components/editardosProfissionais";
import EditarServicos from "../components/editarServicos";
import ListagemAgenda from "../components/ListagemAgenda";
import ListagemDeClientes from "../components/ListagemDeClientes";
import ListagemProfissional from "../components/ListagemDeProfissionais";
import ListagemDeServico from "../components/ListagemDeServicos";
import RedefinirSenha from "../components/redefinirSenha";
import RedefinirSenhaProfissioanais from "../components/redefinirSenhaProfissional";




const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="CadastroDeClientes" element={<CadastroDeClientes />} />
                <Route path="CadastroDeProfissionais" element={<CadastroDeProfissionais/>} />
                <Route path="CadastroDeServicos" element={<CadastroServico/>} />
                <Route path="CadastroAgenda" element={<CadastroAgenda/>}/>
                <Route path="ListagemDeClientes" element={<ListagemDeClientes/>} />
                <Route path="ListagemDeProfissional" element={<ListagemProfissional/>} />
                <Route path="ListagemServico" element={<ListagemDeServico/>} />
                <Route path="ListagemAgenda" element={<ListagemAgenda/>}/>
                <Route path="/EditarClientes/:id" element={<EditarClientes />}/>
                <Route path="/EditarProfissionais/:id" element={<EditarProfissional />}/>
                <Route path="/EditarServico/:id" element={<EditarServicos />}/>
                <Route path="/redefinirSenhaClientes" element={<RedefinirSenha />}/>
                <Route path="/redefinirSenhaProfissionais" element={<RedefinirSenhaProfissioanais/>}/>
            </Routes>
        </BrowserRouter>
    );

}
export default AppRoute;
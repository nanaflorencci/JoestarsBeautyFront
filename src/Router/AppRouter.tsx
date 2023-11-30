import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroAgenda from "../Components/CadastroAgenda";
import CadastroDeClientes from "../Components/CadastroCliente";
import CadastroDeProfissionais from "../Components/CadastroProfissional";
import CadastroServico from "../Components/CadastroServico";
import EditarClientes from "../Components/EditarClientes";
import EditarProfissional from "../Components/EditarProfissionais";
import EditarServicos from "../Components/EditarServiços";
import ListagemAgenda from "../Components/ListagemAgenda";
import ListagemDeClientes from "../Components/ListagemCliente";
import ListagemProfissional from "../Components/ListagemProfissional";
import ListagemDeServico from "../Components/ListagemServico";
import RedefinirSenha from "../Components/RedefinirSenha";
import RedefinirSenhaProfissioanais from "../Components/RedefinirSenhaProfissional";




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
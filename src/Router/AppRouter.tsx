import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroDeClientes from "../Components/CadastroCliente";
import CadastroDeProfissionais from "../Components/CadastroProfissional";
import CadastroServico from "../Components/CadastroServico";
import ListagemDeClientes from "../Components/Listagem";
import ListagemProfissional from "../Components/ListagemProfissional";
import ListagemDeServico from "../Components/ListagemServico";


const AppRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="CadastroDeClientes" element={<CadastroDeClientes />} />
                <Route path="CadastroDeProfissionais" element={<CadastroDeProfissionais/>} />
                <Route path="CadastroDeServicos" element={<CadastroServico/>} />
                <Route path="ListagemDeClientes" element={<ListagemDeClientes/>} />
                <Route path="ListagemDeProfissional" element={<ListagemProfissional/>} />
                <Route path="ListagemServiço" element={<ListagemDeServico/>} />
            </Routes>
        </BrowserRouter>
    );

}
export default AppRoute;
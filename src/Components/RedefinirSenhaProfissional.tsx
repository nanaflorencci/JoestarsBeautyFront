import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from "react";

import style from '../template.module.css'
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const RedefinirSenhaProfissioanais =()=>{
    const [email, setEmail] = useState<string>("");

    const parametros = useParams();

    const redefinir = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            email: email
        }
        axios.post("http://127.0.0.1:8000/api/Profissional/senha/redefinir", dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                window.location.href = "/ListagemDeProfissional";
            }).catch(function (error) {
                console.log('Ocorreu um erro ao atualizar sua senha');
            });


    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/Profissional/visualizar" + parametros.id);
                setEmail(response.data.data.email);
            } catch (error) {
                console.log("Erro ao buscar dados da api");

            }

        }
        fetchData();

    }, []);


    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);

        }
    }
    return (
        <div>
            <Header />
                <main className={style.main}>
                    <div className='container'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Redefinir Senha</h5>
                                <form onSubmit={redefinir} className='row g-3'>
                                    <div className='col-6'>
                                        <label htmlFor="email" className='form-label'>E-mail</label>
                                        <input type="text" name='email' className='form-control' required onChange={handleState} value={email} />
                                        <div className='col-12'>
                                    <button type='submit' className='btn btn-dark btn-sm'>Atualizar</button>
                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
        </div>
    );
}

export default RedefinirSenhaProfissioanais
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import style from '../template.module.css'
import axios from 'axios';
import Header from './Header';
import FooterAgenda from './Footer';

import { CadastroInterface } from '../Interfaces/CadastroProfissionalInterface';

const CadastroAgenda = () => {

    const [profissional_id, setProfissional_id] = useState<string>("");
    const [dataHora, setDataHora] = useState<string>("");
    const [profissional, setProfissional] = useState<CadastroInterface[]>([]);

    const cadastrarAgenda = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            profissional_id: profissional_id,
            dataHora: dataHora,
        }

        axios.post('http://127.0.0.1:8000/api/agendamento',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then(function (response) {
            alert('Cadastro da agenda realizado com êxito')

            window.location.href = "/ListagemAgenda"
        }).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Profissional/nome');
                if (true == response.data.status) {
                    setProfissional(response.data.data)
                    console.log(profissional);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "dataHora") {
            setDataHora(e.target.value);
        }
    }
    const handleProfissionalSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setProfissional_id(e.target.value);
    }

    return (
        <div>
            <Header />
            <main className={style.main}>
                <div className='container'>

                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar </h5>
                            <form onSubmit={cadastrarAgenda} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Profissional_Id</label>
                                    <select name='profissional_id' id='profissional_id ' className='form-control' required onChange={handleProfissionalSelect}   >
                                        <option value="0">Selecione um profissional</option>
                                        {profissional.map(profissional => (
                                            <option key={profissional.id} value={profissional.id}>
                                                {profissional.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='dataHora' className='form-control' required onChange={handleState} />
                                </div>

                                <div className='col-12'>
                                    <button type='submit' className='btn btn-dark btn-sm' >Cadastrar</button >
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <FooterAgenda />
        </div>

    )
}

export default CadastroAgenda;
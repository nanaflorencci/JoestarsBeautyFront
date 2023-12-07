import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';

import style from '../template.module.css'
import axios from 'axios';
import Header from './Header';
import FooterAgenda from './FooterAgenda';

import { CadastroProfissionaisInterface } from '../Interfaces/CadastroProfissionalInterface';


const CadastroAgenda = () => {

    const [profissional_id, setProfissional_id] = useState<string>("");
    const [dataHora, setDataHora] = useState<string>("");
    const [profissional, setProfissional] = useState<CadastroProfissionaisInterface[]>([]);
    const [profissional_idErro, setProfissional_idErro] = useState<string>("");
    const [dataHoraErro, setDataHoraErro] = useState<string>("");
    const [profissionalErro, setProfissionalErro] = useState<CadastroProfissionaisInterface[]>([]);


    const cadastrarAgenda = (e: FormEvent) => {
        setProfissional_idErro("")
        setDataHoraErro("")
        setProfissionalErro([])

        e.preventDefault();

        const dados = {
            profissional_id: profissional_id,
            dataHora: dataHora,
        }

        axios.post('http://127.0.0.1:8000/api/cadastroAgenda',
            dados,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then(function (response) {
            if(response.data.success === false){
                if('profissional_id' in response.data.error){
                    setProfissional_idErro(response.data.error.profissional_id[0])
                }
                if('dataHora' in response.data.error){
                    setDataHoraErro(response.data.error.dataHora[0])
                }
                if('profissional_id' in response.data.error){
                    setProfissionalErro(response.data.error.profissional_id[0])
                }
            } else {
            window.location.href = "/ListagemDeAgenda"
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nome/profissional');
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
                                    <select name='profissional_id' id='profissional_id ' className='form-control' required onChange={handleProfissionalSelect} >
                                        <option value="0">Selecione um Profissional</option>
                                        {profissional.map(profissional => (
                                            <option key={profissional.id} value={profissional.id}>
                                                {profissional.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className='text-danger'>{profissional_idErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='dataHora' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{dataHoraErro}</div>
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
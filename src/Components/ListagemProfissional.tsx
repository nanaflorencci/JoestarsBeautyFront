import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import styles from '../template.module.css'
import Footer from './Footer';
import { CadastroInterface } from '../Interfaces/CadastroProfissionalInterface';
import { Link } from 'react-router-dom';

const ListagemProfissional = () => {

    const [Profissional, setProfissional] = useState<CadastroInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");

    function handleDelete(id: number) {
        const confirm = window.confirm('Você tem certeza que deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/Profissional/delete/' + id)
        .then(function(response){
            window.location.href = "/ListagemDeProfissional"
        }).catch(function(error){
            console.log('Ocorreu um erro ao excluir');
        })
    }

        const handleState = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Profissional/nome',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if(true == response.data.status){
                        setProfissional(response.data.data)
                    }
                }).catch(function (error) {
                    console.log(error)
                });

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/Profissional/visualizar');
                if(true == response.data.status){
                    setProfissional(response.data.data)
                }
            } catch (error) {
                setError("Ocorreu um erro");
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className='container'>

                    <div className='col-md mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    Pesquisar
                                </h5>
                                <form onSubmit={buscar} className='row'>
                                    <div className='col-10'>
                                        <input type="text" name='pesquisa' className='form-control'
                                            onChange={handleState} />

                                    </div>
                                    <div className='col-1'>
                                        <button type='submit' className='btn btn-dark'>Pesquisar</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'> Listagem de Profissional</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>Data de Nascimento</th>
                                        <th>cep</th>
                                        <th>Complemento</th>
                                        <th>Salário</th>
                                        
                                        
                                        
                                        
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Profissional.map(Profissional => (
                                        <tr key={Profissional.id}>
                                            <td>{Profissional.id}</td>
                                            <td>{Profissional.nome}</td>
                                            <td>{Profissional.email}</td>
                                            <td>{Profissional.cpf}</td>
                                            <td>{Profissional.dataNascimento}</td>
                                            <td>{Profissional.cep}</td>
                                            <td>{Profissional.complemento}</td>
                                            <td>{Profissional.salario}</td>
                                         
                                            <td>
                                            <Link to={"/EditarProfissionais/" + Profissional.id} className='btn btn-primary btn-sm'>Editar</Link>
                                            <a onClick={e => handleDelete(Profissional.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                            <Link to={"/redefinirSenhaProfissionais"} className='btn btn-primary btn-sm'>Redefinir sua senha</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
export default ListagemProfissional;
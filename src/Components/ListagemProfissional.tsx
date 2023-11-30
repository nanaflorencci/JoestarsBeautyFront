import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import styles from '../template.module.css';
import { CadastroProfissionaisInterface } from '../Interfaces/CadastroProfissionalInterface';
import { Link } from 'react-router-dom';
import Header from './Header';
import FooterProfissionais from './FooterProfissional';


const ListagemProfissional = () => {

    const [Profissional, setProfissional] = useState<CadastroProfissionaisInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");


    //Delete
    function handleDelete(id: number) {
        const confirm = window.confirm('Você tem certeza que deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/delete/profissional/' + id)
        .then(function(response){
            if (response.data.status === false){
                alert ('Este profissional ainda têm agendamentos')
            } else {
            window.location.href = "/ListagemDeProfissional"
            }
        }).catch(function(error){
            console.log('Ocorreu um erro ao excluir');
        })
    }
        const handleState = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    //Pesquisar por nome
    const buscar = (e: FormEvent) => {
        e.preventDefault();

        async function fetchData() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/nome/profissional',
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
                const response = await axios.get('http://127.0.0.1:8000/api/visualizar/profissional');
                if(true === response.data.status){
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
            <Header />
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
                                        <button type='submit' className='btn btn-success'>Pesquisar</button>
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
                                        <th>cep</th>
                                        <th>complemento</th>
                                        <th>salario</th>
                                        
                                        
                                        
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
                                            <td>{Profissional.cep}</td>
                                            <td>{Profissional.complemento}</td>
                                            <td>{Profissional.salario}</td>                                      
                                            <td>
                                            <Link to={"/EditarProfissional/" + Profissional.id} className='btn btn-primary btn-sm m-1'>Editar</Link>
                                            <Link to={"/RedefinirSenhaProfissionais/"} className='btn btn-primary btn-sm m-1'>Redefinir senha</Link>
                                                <a onClick={e => handleDelete(Profissional.id)} className='btn btn-danger btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <FooterProfissionais />
        </div>
    );
}
export default ListagemProfissional;
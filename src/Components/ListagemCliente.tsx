import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import styles from '../template.module.css'
import { CadastroInterface } from '../Interfaces/CadastroClienteInterface';
import { Link } from 'react-router-dom';
import Header from './Header';
import FooterClientes from './FooterCliente';



const ListagemDeClientes = () => {

    const [clientes, setClientes] = useState<CadastroInterface[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");


    //Delete
    function handleDelete(id: number) {
        const confirm = window.confirm('Você tem certeza que deseja excluir?');
        if (confirm)
            axios.delete('http://127.0.0.1:8000/api/delete/clientes/' + id)
        .then(function(response){
            window.location.href = "/ListagemDeClientes"
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
                const response = await axios.post('http://127.0.0.1:8000/api/nome/clientes',
                    { nome: pesquisa },
                    {
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    }
                ).then(function (response) {
                    if(true == response.data.status){
                        setClientes(response.data.data)
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
                const response = await axios.get('http://127.0.0.1:8000/api/visualizar/clientes');
          
                if(true === response.data.status){
                    setClientes(response.data.data)
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

                    <div className='col-md mb-4'>
                        <div className='card'>
                            <div className='card-body'>
                                <h5 className='card-title'>Pesquisar</h5>
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
                            <h5 className='card-title'> Listagem de Clientes</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>CPF</th>
                                        <th>cep</th>
                                        <th>Complemento</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientes.map(cliente => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.id}</td>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.email}</td>
                                            <td>{cliente.cpf}</td>
                                            <td>{cliente.cep}</td>
                                            <td>{cliente.complemento}</td>
                                            
                                            
                                            <td>
                                            <Link to={"/EditarCliente/"+cliente.id} className='btn btn-secondary btn-sm m-1'>Editar</Link>
                                            <Link to={"/RedefinirSenhaClientes/"} className='btn btn-secondary btn-sm m-1'>Redefinir senha</Link>
                                                <a onClick={e => handleDelete(cliente.id)} className='btn btn-dark btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <FooterClientes />
        </div>
    );
}
export default ListagemDeClientes;
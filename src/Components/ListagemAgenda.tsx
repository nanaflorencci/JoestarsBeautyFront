import axios from 'axios';
import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from '../template.module.css'
import { CadastroInterfaceAgenda } from '../Interfaces/CadastroAgendaInterface';
import { Link } from 'react-router-dom';
import Header from './Header';
import FooterAgenda from './FooterAgenda';


const ListagemAgenda = () => {

    const [agenda, setAgenda] = useState<CadastroInterfaceAgenda[]>([]);
    const [pesquisa, setPesquisa] = useState<string>('');
    const [error, setError] = useState("");


        const handleState = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.name === "pesquisa") {
            setPesquisa(e.target.value);
        }
    }

    
//deletando
function handleDelete(id: number) {
    const confirm = window.confirm('Você tem certeza que deseja excluir?');
    if (confirm)
        axios.delete('http://127.0.0.1:8000/api/delete/agendamento/' + id)
    
    .then(function(response){
       
        window.location.href = " /ListagemDeAgenda"
    }).catch(function(error){
        console.log('Ocorreu um erro ao excluir');
        console.log(error);
    })
}

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
                        setAgenda(response.data.data)
                    } else {
                        setAgenda([]);
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
                const response = await axios.get('http://127.0.0.1:8000/api/visualizar/agendamento');
                if(true == response.data.status){
                    setAgenda(response.data.data)
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
                            <h5 className='card-title'> Listagem de agendas</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>ID Profissionais</th>
                                        <th>Data e hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agenda.map(agenda => (
                                        <tr key={agenda.id}>
                                            <td>{agenda.id}</td>
                                            <td>{agenda.profissional_id}</td>
                                            <td>{agenda.dataHora}</td>
                                            
                                            <td>
                                            <Link to={"/EditarAgenda/"+agenda.id} className='btn btn-secondary btn-sm m-1'>Editar</Link>
                                                <a onClick={e => handleDelete(agenda.id)} className='btn btn-dark btn-sm'>Excluir</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <FooterAgenda />
        </div>
    );
}
export default ListagemAgenda;
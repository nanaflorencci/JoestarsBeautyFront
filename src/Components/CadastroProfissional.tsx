import React, { Component, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import style from '../template.module.css'
import Footer from './Footer';

const CadastroDeProfissionais = () => {

    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("")
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [salario, setSalario]= useState<string>("");

    const [nomeErro, setNomeErro] = useState<string>("");
    const [celularErro, setCelularErro] = useState<string>("");
    const [emailErro, setEmailErro] = useState<string>("");
    const [cpfErro, setCpfErro] = useState<string>("");
    const [dataNascimentoErro, setDataNascimentoErro] = useState<string>("")
    const [cidadeErro, setCidadeErro] = useState<string>("");
    const [estadoErro, setEstadoErro] = useState<string>("");
    const [paisErro, setPaisErro] = useState<string>("");
    const [ruaErro, setRuaErro] = useState<string>("");
    const [numeroErro, setNumeroErro] = useState<string>("");
    const [bairroErro, setBairroErro] = useState<string>("");
    const [cepErro, setCepErro] = useState<string>("");
    const [complementoErro, setComplementoErro] = useState<string>("");
    const [passwordErro, setPasswordErro] = useState<string>("");
    const [salarioErro, setSalarioErro] = useState<string>("");
    const cadastrarUsuario = (e: FormEvent) => {

        e.preventDefault();
        const dados = {
            nome: nome,
            email: email,
            celular:celular,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            estado: estado,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            complemento: complemento,
            password: password,
            salario:salario
        }

        console.log(dados)
        axios.post('http://127.0.0.1:8000/api/Profissional', dados, {
            headers:
                { "Accept": "application/json", "Content-Type": "application/json" }
        }).then(function (response) {
          window.location.href = "/ListagemDeProfissional"
        }).catch(function (error) {
            console.log(error);
        });
    }

    const findCep = (e: FormEvent) => {
        setNomeErro("")
        setCelularErro("")
        setEmailErro("")
        setCpfErro("")
        setDataNascimentoErro("")
        setCidadeErro("")
        setEstado("")
        setPaisErro("")
        setRuaErro("")
        setNumeroErro("")
        setBairroErro("")
        setCepErro("")
        setComplementoErro("")
        setPasswordErro("")
        setSalarioErro("")

        e.preventDefault();

        fetch('https://viacep.com.br/ws/' + cep + '/json/',
            {
                method: 'GET'
            }
        ).then(response => response.json())
            .then(
                data => {
                    console.log(data);

                    setCidade(data.localidade);
                    setPais(data.pais);
                    setEstado(data.uf);


                }
            )

    }
const submitForm = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name = "cep") {
            setCep(e.target.value);
        }

    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "cpf") {
            setCpf(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
        if (e.target.name==="celular"){
            setCelular(e.target.value);
        }
        if (e.target.name==="dataNascimento"){
            setDataNascimento(e.target.value);
        }
        if (e.target.name=="cidade"){
            setCidade(e.target.value);
        }
        if(e.target.name =="estado"){
            setEstado(e.target.value);
        }
        if(e.target.name=="pais"){
            setPais(e.target.value);
        }
        if(e.target.name=="rua"){
            setRua(e.target.value);
        }
        if(e.target.name=="numero"){
            setNumero(e.target.value);
        }
        if(e.target.name=="bairro"){
            setBairro(e.target.value);
        }
        if(e.target.name=="cep"){
            setCep(e.target.value);
        }
        if(e.target.name=="complemento"){
            setComplemento(e.target.value);
        }
        if(e.target.name=="salario"){
            setSalario(e.target.value);
        }
    }

    return (
        <div>
            <Header />
            <main className={style.main}>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastro de Profissionais</h5>
                            <form onSubmit={cadastrarUsuario} className='row g-3'>
                                <div className='col-6'>
                                <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} placeholder='ex: Anthonio Zeppeli' />
                                    <div className='text-danger'>{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label' >E-mail</label>
                                    <input type="email" name='email' className='form-control' required onChange={handleState}  placeholder='ex: zeppelilindao@gmail.com'/>
                                    <div className='text-danger'>{emailErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} placeholder='ex: 11111111111'/>
                                    <div className='text-danger'>{cpfErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cpf" className='form-label'>Data de Nascimento</label>
                                    <input type="date" name='dataNascimento' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{dataNascimentoErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cep" className='form-label'>CEP</label>
                                    <input type="text" name='cep' className='form-control' required onBlur={findCep} onChange={handleState} placeholder='Apenas  números'/>
                                    <div className='text-danger'>{cepErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="estado" className='form-label'>Estado</label>
                                    <input type="text" name='estado' value={estado} className='form-control' required onChange={handleState}placeholder='ex: SP' />
                                    <div className='text-danger'>{estadoErro}</div>
                                    <div className='text-danger'>{estadoErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="cidade" className='form-label'>Cidade</label>
                                    <input type="text" value={cidade} id='cidade' name='cidade' className='form-control' required onChange={handleState}placeholder='ex: Presidente Epitácio' />
                                    <div className='text-danger'>{cidadeErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>Celular</label>
                                    <input type="text" name='celular' className='form-control' required onChange={handleState} placeholder='Apenas 11 números'/>
                                    <div className='text-danger'>{celularErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="celular" className='form-label'>País</label>
                                    <input type="text" name='pais' className='form-control' required onChange={handleState} placeholder='ex: Brasil' />
                                    <div className='text-danger'>{paisErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="rua" className='form-label'>Rua</label>
                                    <input type="text" name='rua' className='form-control' required onChange={handleState}placeholder='ex: Amarelinha' />
                                    <div className='text-danger'>{ruaErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="numero" className='form-label'>Número</label>
                                    <input type="text" name='numero' className='form-control' required onChange={handleState} placeholder='Apenas 11 números'/>
                                    <div className='text-danger'>{numeroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="bairro" className='form-label'>Bairro</label>
                                    <input type="text" name='bairro' className='form-control' required onChange={handleState} placeholder='ex: Palmira' />
                                    <div className='text-danger'>{bairroErro}</div>
                                </div>
                                <div className='col-4'>
                                    <label htmlFor="complemento" className='form-label'>Complemento</label>
                                    <input type="text" name='complemento' className='form-control' required onChange={handleState} placeholder='ex: Em frente a um bar'/>
                                    <div className='text-danger'>{complementoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="salario" className='form-label'>Salário</label>
                                    <input type="decimal" name='salario' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{salarioErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="text" name='password' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{passwordErro}</div>
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-dark btn-sm'>Cadastrar</button>
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

export default CadastroDeProfissionais;
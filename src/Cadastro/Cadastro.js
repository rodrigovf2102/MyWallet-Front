import styled from 'styled-components';
import {Title, Container,Form,Input,Entrar,Cadastrar} from '../Login/Login';
import { Grid } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { postCadastro } from '../Services/MyWallet';

export default function Cadastro(){
    const [disableForm, setDisableForm] = useState(false);
    const [cadastro,setCadastro] = useState({name:"",email:"",senha:""});
    const [confirmSenha,setConfirmSenha] = useState("");
    const [corCadastrar,setCorCadastrar] = useState(1);
    const navigate = useNavigate();

    function cadastroInfo(event) {
        event.preventDefault();
    }

    function FazerCadastro(){
        if(confirmSenha!==cadastro.senha){
            alert('Senhas não conferem')
            return;
        }
        setCorCadastrar(0.6);
        setDisableForm(true);
        console.log(cadastro);
        const promise = postCadastro(cadastro);
        promise.then(Autorizado);
        promise.catch(Desautorizado);
    }

    function Autorizado(response){
        console.log(response.data);
        setCorCadastrar(1);
        setDisableForm(false);
        navigate('/') ;      
    }
    
    function Desautorizado(){
        alert('Dados inválidos');
        setCorCadastrar(1);
        setDisableForm(false);
    }

    return (
        <Container>
            <Title>My Wallet</Title>
            <Form onSubmit={cadastroInfo}>
                <Input type="text" placeholder=' Nome' disabled={disableForm}
                       onChange={event => setCadastro({...cadastro, name : event.target.value})}/>
                <Input type="text" placeholder=' E-mail' disabled={disableForm}
                       onChange={event => setCadastro({...cadastro, email : event.target.value})}/>
                <Input type="password" placeholder=' Senha' disabled={disableForm} 
                       onChange={event => setCadastro({...cadastro, senha : event.target.value})}/>
                <Input type="password" placeholder='  Confirme a senha' disabled={disableForm} 
                       onChange={event => setConfirmSenha(event.target.value)}/>
                <Entrar cor={corCadastrar} type="submit" disabled={disableForm} onClick={FazerCadastro}>
                    {disableForm ? <Grid color='white' radius="8" heigth="100"/> :'Cadastrar'}
                </Entrar>
                <Link to="/"><Cadastrar>Já tem uma conta? Faça login!</Cadastrar></Link>
            </Form>
        </Container>
    );
}
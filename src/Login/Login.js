import { useState } from 'react';
import styled from 'styled-components';
import { postLogin } from '../Services/MyWallet';
import { Grid } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const [ login, setLogin ] = useState({ email: "", password: "" });
    const [corEntrar, setCorEntrar] = useState(1)
    const [disableForm, setDisableForm] = useState(false);
    const navigate = useNavigate();

    function loginInfo(event) {
        event.preventDefault();
    }

    function Login() {
        setCorEntrar(0.6);
        setDisableForm(true);
        const promisse = postLogin(login);
        promisse.then(autorizado);
        promisse.catch(desautorizado);
    }

    function desautorizado() {
        alert("Usuário ou senha incorreto(s)");
        setCorEntrar(1);
        setDisableForm(false);
    }

    function autorizado(response) {
        console.log(response.data)
        setDisableForm(false);
        setCorEntrar(1);
        navigate('/Saldo');    
    }    

    return (
        <Container>
            <Title>My Wallet</Title>
            <Form onSubmit={loginInfo}>
                <Input type="text" placeholder=' E-mail' onChange={event => setLogin({ ...login, email: event.target.value })}
                    disabled={disableForm} required />
                <Input type="password" placeholder=' Senha' onChange={event => setLogin({ ...login, password: event.target.value })}
                    disabled={disableForm} required />
                <Entrar cor={corEntrar} onClick={Login} disabled={disableForm} type="submit">
                    {disableForm ? <Grid color='white' radius="8" heigth="100" /> : "Entrar"}
                </Entrar>
                <Link to="/cadastro"><Cadastrar>Primeira vez? Cadastre-se</Cadastrar></Link>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const Title = styled.div`
    font-size: 32px;
    font-weight: 700;
    font-family: 'Saira Stencil One', cursive;
    color: white;
`
const Form = styled.form`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Input = styled.input`
    width: 326px;
    height: 58px;
    border-radius: 5px;
    margin-bottom: 13px;
    background-color: white;
    color: black;
    border: none;
    `
const Entrar = styled.button`
    width: 326px;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    color: white;
    font-size: 21px;
    opacity: ${props => props.cor};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
`
const Cadastrar = styled.div`
    font-size: 15px;
    margin-top: 35px;
    color: white;
`
export { Title,Container, Form, Input, Entrar, Cadastrar };

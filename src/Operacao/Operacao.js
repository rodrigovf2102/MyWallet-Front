import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Entrar, Cadastrar } from '../Login/Login';
import { Grid } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { postOperacao,updateOperacao } from '../Services/MyWallet';
import UserContext from '../context/UserContext';

export default function Operacao({ operationInfo }) {

    const [operacao, setOperacao] = useState({ valor: 0, descricao: "", tipo: operationInfo.type })
    const [disableForm, setDisableForm] = useState(false);
    const [corOperacao, setCorOperacao] = useState(1);
    const [saveOrUpdate,setSaveOrUpdate] = useState("");
    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);

    const config = {
        headers: {
            "Authorization": `Bearer ${tasks}`
        }
    }

    useEffect(()=>{
        if(operationInfo.status === 'Editar'){
            setSaveOrUpdate('Atualizar');
        } else{
            setSaveOrUpdate('Salvar');
        }
    },[])

    function operacaoInfo(event) {
        event.preventDefault();
    }

    function addOperacao() {
        setCorOperacao(0.6);
        setDisableForm(true);
        if (operationInfo.status === 'Editar') {
            operacao.id = operationInfo.id;
            const promisse = updateOperacao(operacao, config);
            promisse.then(autorizado);
            promisse.catch(desautorizado);
        } else {
            const promisse = postOperacao(operacao, config);
            promisse.then(autorizado);
            promisse.catch(desautorizado);
        }
    }

    function desautorizado(error) {
        if (error.response.data === undefined) {
            alert('Error: unhable to connect to server');
        }
        else {
            alert(error.response.data);
            if (error.response.data.indexOf('token') !== -1) {
                navigate('/');
            }
        }
        setCorOperacao(1);
        setDisableForm(false);
    }

    function autorizado() {
        setDisableForm(false);
        setCorOperacao(1);
        navigate('/Saldo');
    }

    function back() {
        navigate('/Saldo');
    }

    return (
        <Container>
            <Topo>
                {operationInfo.status} {operationInfo.type}
                <ion-icon onClick={back} name="arrow-back-circle-outline"></ion-icon>
            </Topo>
            <Form onSubmit={operacaoInfo}>
                <Input type="text" placeholder=' Valor' onChange={event => setOperacao({ ...operacao, valor: event.target.value })}
                    disabled={disableForm} required />
                <Input type="text" placeholder=' Descrição' onChange={event => setOperacao({ ...operacao, descricao: event.target.value })}
                    disabled={disableForm} required />
                <Entrar cor={corOperacao} onClick={addOperacao} disabled={disableForm} type="submit">
                    {disableForm ? <Grid color='white' radius="8" heigth="100" /> : `${saveOrUpdate} ${operationInfo.type}`}
                </Entrar>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    padding: 25px;
    color: white;
    font-weight: 700;
    font-size: 26px;
`
const Topo = styled.div`
    display: flex;
    width: 325px;
    justify-content: space-between;
`
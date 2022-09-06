import { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Entrar, Cadastrar } from '../Login/Login';
import { Grid } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { postOperacao } from '../Services/MyWallet';

export default function Operacao({ operationType }) {

    const [operacao, setOperacao] = useState({ valor: 0, descricao: "", tipo:operationType })
    const [disableForm, setDisableForm] = useState(false);
    const [corOperacao, setCorOperacao] = useState(1);
    const navigate = useNavigate();

    function operacaoInfo(event) {
        event.preventDefault();
    }

    function addOperacao() {
        setCorOperacao(0.6);
        setDisableForm(true);
        const promisse = postOperacao(operacao);
        promisse.then(autorizado);
        promisse.catch(desautorizado);
    }

    function desautorizado() {
        alert("Valor ou descrição inválidos");
        setCorOperacao(1);
        setDisableForm(false);
    }

    function autorizado(response) {
        console.log(response.data)
        setDisableForm(false);
        setCorOperacao(1);
        navigate('/Saldo');
    }

    function back(){
        navigate('/Saldo');
    }

    return (
        <Container>    
            <Topo>
                Nova {operationType}
                <ion-icon onClick={back} name="arrow-back-circle-outline"></ion-icon>
            </Topo>
            <Form onSubmit={operacaoInfo}>
                <Input type="text" placeholder=' Valor' onChange={event => setOperacao({ ...operacao, valor: event.target.value })}
                    disabled={disableForm} required />
                <Input type="text" placeholder=' Descrição' onChange={event => setOperacao({ ...operacao, descricao: event.target.value })}
                    disabled={disableForm} required />
                <Entrar cor={corOperacao} onClick={addOperacao} disabled={disableForm} type="submit">
                    {disableForm ? <Grid color='white' radius="8" heigth="100" /> : `Salvar ${operationType}`}
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
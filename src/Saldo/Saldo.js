import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import { getOperacao, getUser } from '../Services/MyWallet';
import UserContext from '../context/UserContext';

export default function Saldo({ setOperationType }) {

    const navigate = useNavigate();
    const { tasks, setTasks } = useContext(UserContext);
    const [operacoes, setOperacoes] = useState([ ])
    const [saldo, setSaldo] = useState(0);
    const [saldoCor, setSaldoCor] = useState(0);
    const [username, setUsername] = useState("");
    
    const config = {
        headers: {
            "Authorization": `Bearer ${tasks}`
        }
    }

    useEffect(() => {
        const promisse = getOperacao(config);
        promisse.then(autorizado);
        promisse.catch(desautorizado);
    }, [])

    useEffect(() => {
        const promise = getUser(config)
        promise.then(autorizadoUser);
        promise.catch(desautorizado);
    }, [])

    function desautorizado(error) {
        if (error.response.data === undefined) {
            alert('Error: unhable to connect to server');
        }
        else {
            alert(error.response.data);
            if (error.response.data.indexOf('token')!==-1) {
                navigate('/');
            }
        }
    }

    function autorizado(response) {
        setOperacoes(response.data);
    }
    function autorizadoUser(response){
        setUsername(response.data);
    }

    useEffect(() => {
        let aux = 0;
        operacoes.map((operacao) =>
            (operacao.type === 'red' ? aux -= operacao.value : aux += operacao.value))
        setSaldo(aux);
        if (aux >= 0) {
            setSaldoCor('green');
        }
        else {
            setSaldoCor('red');
        }
    }, [operacoes])

    function logout() {
        navigate('/')
    }
    function transfer(type) {
        setOperationType(type);
    }

    return (
        <Container>
            <Top>
                <Title>Olá, {username}</Title>
                <ion-icon onClick={logout} name="log-out-outline"></ion-icon>
            </Top>
            {operacoes.length === 0 ?
                <Conteudo>Não há registros de entrada ou saída</Conteudo>
                :
                <ConteudoCheio>
                    <div>{operacoes.map((operacao) => (
                        <Operacao>
                            <div>
                                <Data>{operacao.date}</Data>
                                <Descricao>{operacao.description}</Descricao>
                            </div>
                            <Valor type={operacao.type}>{operacao.value.toFixed(2).replace('.', ',')}</Valor>
                        </Operacao>))}
                    </div>
                    <Balanco>
                        <DescricaoNegrito>SALDO</DescricaoNegrito>
                        <Valor type={saldoCor}>{saldo.toFixed(2).replace('.', ',')}</Valor>
                    </Balanco>
                </ConteudoCheio>
            }
            <Bottom>
                <Transferencia>
                    <Link onClick={() => { transfer('entrada') }} to="/Operacao">
                        <div>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            Nova Entrada
                        </div>
                    </Link>

                </Transferencia>
                <Transferencia>
                    <Link onClick={() => { transfer('saída') }} to="/Operacao">
                        <div>
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            Nova Saída
                        </div>
                    </Link>
                </Transferencia>
            </Bottom>
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 25px;
`
const Title = styled.div`
    font-weight: 700;
`
const Top = styled.div`
    display: flex;
    justify-content: space-between;
    color:white;
    font-size:26px;
    width: 100%;
    ion-icon{
        cursor: pointer;
    }
`
const Conteudo = styled.div`
    width: 100%;
    height: 450px;
    border-radius: 5px;
    background-color: white;
    margin-top: 25px;
    font-size: 20px;
    color: #868686;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ConteudoCheio = styled.div`
    width: 100%;
    height: 450px;
    border-radius: 5px;
    background-color: white;
    margin-top: 25px;
    font-size: 20px;
    color: #868686;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    >div{
        overflow-y: auto;
    }
`
const Bottom = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

`
const Transferencia = styled.div`
    width: 49%;
    font-weight: 700;
    font-size: 17px;
    color: white;
    background-color: #A328D6;
    border-radius: 5px;
    height: 114px;
    margin-top:12px;
    padding: 10px;
    div{
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
`
const Operacao = styled.div`
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    div{
        display: inline;
    }
`
const Data = styled.div`
    color: #C6C6C6;
    padding-right: 10px;
`
const Descricao = styled.div`
    color: black;
`
const Valor = styled.div`
    color: ${props => props.type};
`
const Balanco = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px;
`
const DescricaoNegrito = styled.div`
    color: black;
    font-weight: 700;
`
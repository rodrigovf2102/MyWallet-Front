import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function Saldo({setOperationType}) {

    const navigate = useNavigate();

    function logout() {
        navigate('/')
    }
    function transfer(type){
        setOperationType(type);
    }

    return (
        <Container>
            <Top>
                <Title>Olá, Fulano</Title>
                <ion-icon onClick={logout} name="log-out-outline"></ion-icon>
            </Top>
            <Conteudo>
                Não há registros de entrada ou saída
            </Conteudo>

            <Bottom>
                <Transferencia>
                    <Link onClick={()=>{transfer('entrada')}} to="/Operacao">
                        <div>
                            <ion-icon name="add-circle-outline"></ion-icon>
                            Nova Entrada
                        </div>
                    </Link>

                </Transferencia>
                <Transferencia>
                    <Link onClick={()=>{transfer('saída')}} to="/Operacao">
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
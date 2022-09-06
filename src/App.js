import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Login from './Login/Login';
import Cadastro from './Cadastro/Cadastro';
import Operacao from './Operacao/Operacao';
import Saldo from './Saldo/Saldo';
import { useState } from 'react';


export default function App() {
    const [operationType,setOperationType] = useState('');


    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Login />} />
                    <Route path={"/cadastro"} element={<Cadastro />} />
                    <Route path={"/saldo"} element={<Saldo setOperationType={setOperationType} />} />
                    <Route path={"/operacao"} element={<Operacao operationType={operationType}/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}


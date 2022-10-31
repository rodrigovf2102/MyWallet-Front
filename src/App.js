import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Login from './Login/Login';
import Cadastro from './Cadastro/Cadastro';
import Operacao from './Operacao/Operacao';
import Saldo from './Saldo/Saldo';
import { useState } from 'react';
import UserContext from './context/UserContext';


export default function App() {
    
    const [tasks, setTasks] = useState({})
    const [operationInfo, setOperationInfo] = useState({});

    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <UserContext.Provider value={{ tasks, setTasks }}>
                    <Routes>
                        <Route path={"/"} element={<Login />} />
                        <Route path={"/cadastro"} element={<Cadastro />} />
                        <Route path={"/saldo"} element={<Saldo setOperationInfo={setOperationInfo} />} />
                        <Route path={"/operacao"} element={<Operacao operationInfo={operationInfo} />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    );
}


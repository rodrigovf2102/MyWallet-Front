import axios from 'axios';

const Base_URL = 'http://localhost:5000';

function postLogin(login) {
    const promise = axios.post(`${Base_URL}/sign-in`,login);
    return promise;
}

function postCadastro(cadastro) {
    const promise = axios.post(`${Base_URL}/sign-up`,cadastro);
    return promise;
}

function postOperacao(operacao,config) {
    const promise = axios.post(`${Base_URL}/operacao`,operacao,config);
    return promise;
}

function getOperacao(operacao) {
    const promise = axios.get(`${Base_URL}/operacao`,operacao);
    return promise;  
}

function getUser(operacao) {
    const promise = axios.get(`${Base_URL}/user`,operacao);
    return promise;  
}

export {postLogin,postCadastro,postOperacao,getOperacao,getUser}
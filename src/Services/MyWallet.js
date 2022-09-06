import axios from 'axios';

const Base_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function postLogin(login) {
    const promise = axios.post(`${Base_URL}/auth/login`,login);
    return promise;
}

function postCadastro(cadastro) {
    const promise = axios.post(`${Base_URL}/auth/sign-up`,cadastro);
    return promise;
}

function postOperacao(operacao) {
    const promise = axios.post(`${Base_URL}/auth/sign-up`,operacao);
    return promise;
}

export {postLogin,postCadastro,postOperacao}
import axios from 'axios';

const Base_URL = 'https://mywalletproject-backend.herokuapp.com';

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

function getOperacao(config) {
    const promise = axios.get(`${Base_URL}/operacao`,config);
    return promise;  
}

function deleteOperacao(operacao,config) {
    const promise = axios.post(`${Base_URL}/deloperacao`,operacao,config);
    return promise;  
}

function updateOperacao(operacao,config) {
    console.log(operacao)
    const promise = axios.put(`${Base_URL}/operacao`,operacao,config);
    return promise;  
}

function getUser(config) {
    const promise = axios.get(`${Base_URL}/user`,config);
    return promise;  
}

export {postLogin,postCadastro,postOperacao,getOperacao,getUser,deleteOperacao,updateOperacao}
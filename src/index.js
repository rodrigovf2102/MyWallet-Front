import ReactDOM from 'react-dom'
import App from './App';

function Renderizar(){
    return(
        <App/>
    );
}

ReactDOM.render(Renderizar(),document.querySelector('.root'));
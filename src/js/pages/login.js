// Estilos generales
import '../../css/style.css'
import '../../css/pages/login.css'

// Componentes JS
import { generateLogin } from '../components/login/sign-in';
import { generateRegister } from '../components/login/sign-up';

let login = true;

document.addEventListener('click', (e) => {
    if(e.target.id === 'login-change'){
        if(login){
            generateRegister();
            login = false;
        }else{
            generateLogin();
            login = true;
        }
    }
});
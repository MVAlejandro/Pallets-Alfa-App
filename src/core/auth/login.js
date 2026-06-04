// Estilos y variables globales
import '../../shared/css/variables.css'
import '../../shared/css/style.css'

// Estilos del módulo
import '../../shared/css/pages/login.css'

// Componentes JS
import { generateLogin } from './login-view'; 
import { generateRegister } from './register-view';

// Funciones backend
import { handleRegister } from './register-controller';

let login = true;

// Cambiar entre formulario de inicio de sesión y registro
document.addEventListener('click', (e) => {
    if(e.target.id === 'login-change'){
        if(login){
            generateRegister();
            login = false;

            const form = document.querySelector('#register-form');

            form.addEventListener('submit', handleRegister);
        }else{
            generateLogin();
            login = true;
        }
    }
});
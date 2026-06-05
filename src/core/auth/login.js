// Estilos y variables globales
import '../../shared/css/variables.css'
import '../../shared/css/style.css'

// Estilos del módulo
import '../../shared/css/pages/login.css'

// Componentes JS
import { generateLogin } from './login/login-view'; 
import { generateRegister } from './register/register-view';

// Funciones del backend
import { validateAuth } from './auth-validate'; 

let login = true;

// Login inicial
document.addEventListener('DOMContentLoaded', async () => { 
    generateLogin() 
    await validateAuth();
});

// Cambiar entre formulario de inicio de sesión y registro
document.addEventListener('click', (e) => {
    if (e.target.id === 'login-change') {
        login = !login;
        if (login) {
            generateLogin();
        } else {
            generateRegister();
        }
    }
});



// Implementación de Bootstrap y Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';

// Estilos y variables globales
import '../shared/css/variables.css'
import '../shared/css/style.css'

// Estilos del módulo
import '../shared/css/pages/login.css'

// Componentes JS
import { generateLogin } from '../core/auth/login/login-view.js'; 
import { generateRegister } from '../core/auth/register/register-view.js';

// Funciones del backend
import { validateAuth } from '../core/auth/auth-validate.js'; 

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



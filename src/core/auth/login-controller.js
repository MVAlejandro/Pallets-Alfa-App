import { validateLogin } from './login-validate.js'; 
import { login } from './login-service.js'; 

// Función que maneja el inicio de sesión con su validación
export async function handleLogin(e) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!validateLogin(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    try {
        const email = form.querySelector('#email-login').value;
        const password = form.querySelector('#password-login').value;

        const result = await login(email, password);

        if (!result.success) {
            throw new Error(result.message);
        }

        // guardar sesión
        // redireccionar
        // mostrar toast

        console.log(result);

    } catch (error) {
        // Swal.fire(...)
        // pintar errores

        console.error(error);
    }
}
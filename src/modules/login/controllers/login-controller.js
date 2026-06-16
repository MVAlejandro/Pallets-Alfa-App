// Funciones del backend
import { validateLogin } from '../components/login-validate.js'; 
import { login } from '../services/login-service.js'; 

// Función que maneja el inicio de sesión con su validación
export async function handleLogin(e) {
    e.preventDefault();

    const form = e.currentTarget;

    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Ingresando...';
    }

    if (!validateLogin(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });

        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Iniciar Sesión';
        }
        return;
    }

    try {
        const email = form.querySelector('#email-login').value;
        const password = form.querySelector('#password-login').value;

        // Enviar datos
        await login(email, password);

        // Mostrar verificación, limpiar el formulario y redirigir
        await Swal.fire({
            title: 'Inicio de sesión exitoso.',
            padding: "3rem 3rem 5rem 3rem",
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
        });

        window.location.href = '/index.html';

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al iniciar sesión',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        if (error.message?.includes('Correo o contraseña incorrectos')) {
            document.getElementById('error-passwordLog').textContent = error.message;
            // Marcar inputs como inválidos
            document.getElementById("email-login").classList.add('is-invalid');
            document.getElementById("password-login").classList.add('is-invalid');
        }

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Iniciar Sesión';
        }
    }
}
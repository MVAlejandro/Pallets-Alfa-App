// Dependencias
import { Swal } from '../../../shared/utils/utils.js';
// Funciones del backend
import { validateRegister } from '../components/register-validate.js';
import { register } from '../services/register-service.js'; 

// Función que maneja el registro con su validación
export async function handleRegister(e) {
    e.preventDefault();

    const form = e.currentTarget;

    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Enviando...';
    }

    if (!validateRegister(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Registrarse';
        }
        return
    }

    try {
        const fName = form.querySelector('#fname-register').value.trim();
        const sName = form.querySelector('#sname-register').value.trim();
        const email = form.querySelector('#email-register').value.trim();
        const password = form.querySelector('#password-register').value;

        // Enviar datos
        const result = await register(fName, sName, email, password);

        // Mostrar verificación y limpiar el formulario
        Swal.fire({
            title: 'Usuario registrado con éxito',
            text: 'En espera de aprobación.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al registrar usuario',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Registrarse';
        }
    }
}
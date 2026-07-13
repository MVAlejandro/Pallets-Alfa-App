import { Swal } from '../../../shared/utils/utils.js'
// Funciones del backend
import { validateUser } from '../components/profile/user-validate.js';
import { updateUser } from '../services/user-service.js';
import { getSession } from '../../../core/auth/auth-service.js';

// Componentes del módulo
import { ProfileActivity, ProfileHeader, ProfileUserInfo } from '../components/profile/profile-info.js';

// Función que maneja la actualización del usuario con su validación
export async function handleUpdateUser(e) {
    e.preventDefault();

    const form = e.currentTarget;

    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Guardando...';
    }

    if (!validateUser(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });

        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Guardar Cambios';
        }
        return;
    }

    try {
        const nombre = form.querySelector('#info-fname').value;
        const apellido = form.querySelector('#info-sname').value;
        const email = form.querySelector('#info-email').value;

        // Enviar datos
        await updateUser(nombre, apellido, email);

        // Mostrar verificación y limpiar el formulario
        Swal.fire({
            title: 'Perfil actualizado',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Refrescar usuario global y actualizar los campos
        const user = await getSession();

        if (!user) {
            throw new Error('No fue posible recuperar la sesión actualizada');
        }

        window.currentUser = user;

        ProfileHeader(user);
        ProfileUserInfo(user);
        ProfileActivity(user);

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Error al actualizar el perfil',
            icon: 'error',
            confirmButtonText: 'OK'
        });

    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Guardar Cambios';
        }

    }
}
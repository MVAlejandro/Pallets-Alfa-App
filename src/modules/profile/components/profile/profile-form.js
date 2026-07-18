// Dependencias
import { Swal } from '../../../../shared/utils/utils.js'
// Funciones del backend
import { updateUser } from '../../services/user-service.js';
import { getSession } from '../../../../core/auth/auth-service.js';
// Validaciones
import { validateEditUser } from '../../validators/user-validator.js';
// Funciones del módulo
import { ProfileActivity, ProfileHeader, ProfileUserInfo } from './profile-info.js';

// Función que maneja la actualización del usuario con su validación
export async function editUser(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="ps-2">Guardando...</p>`;
    }

    if (!validateEditUser(form)) {
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

    // Guardar valores
    const updatedData = {
        nombre: form.querySelector('#info-fname').value.trim(), 
        apellido: form.querySelector('#info-sname').value.trim(),
        email: form.querySelector('#info-email').value.trim()
    };

    try {
        // Enviar datos
        await updateUser(updatedData);

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

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Guardar Cambios';
        }

    }
}
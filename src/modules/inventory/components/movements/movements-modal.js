// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { updateMovement, deleteMovement, getMovements } from '../../services/movements-service.js'; 
// Funciones del módulo
import { movementsFilter, movementsState } from './movements-filter.js';
// Validaciones
import { validateEditMovement } from '../../validators/movement-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para cargar datos en el modal
export async function renderMovementsEditModal(movimiento) {
    // Insertar valores en los inputs
    document.getElementById('edit-id-movement').value = movimiento.id_movimiento;
    document.getElementById('edit-date').value = movimiento.fecha_movimiento;
    document.getElementById('edit-type').value = movimiento.tipo_movimiento;
    document.getElementById('edit-quantity').value = movimiento.cantidad;
    document.getElementById('edit-observations').value = movimiento.observaciones;
    // Insertar los registros del historial
    document.getElementById('header-status').textContent = movimiento.estado = "CONFIRMADO" ? '* CONFIRMADO' : '- CANCELADO';
    document.getElementById('header-id-movement').textContent = `#INVM-${movimiento.id_movimiento}`;
    document.getElementById('modal-user-created').textContent = `${movimiento.usuario_creacion || "Sin Registro"} - ${movimiento.fecha_creacion}`;
    document.getElementById('modal-user-history').textContent = `${movimiento.usuario_modificacion || "Sin Registro"} - ${movimiento.fecha_modificacion}`;

    // Función para intentar la actualización del movimiento
    document.querySelector('#movement-edit-form').addEventListener('submit', editMovement);
}

// Función para guardar cambios
export async function editMovement(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="ps-2">Actualizando...</p>`;
    }

    if (!validateEditMovement(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
            
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Guardar cambios`;
        }
        return
    }

    const id_movimiento = document.getElementById('edit-id-movement').value;
    const updatedData = {
        cantidad: form.querySelector('#edit-quantity').value.trim(),
        observaciones: form.querySelector('#edit-observations').value.trim()
    };

    try {
        updateMovement(id_movimiento, updatedData);

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();
        Swal.fire({
            title: 'Movimiento actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(movementsState, getMovements)
        movementsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar movimiento:',
            text: error.message || 'Ocurrió un error al actualizar el movimiento',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Guardar cambios`;
        }
    }
};

// Eliminar entrada al dar click en el botón del modal
document.getElementById('btn-delete-entry').addEventListener('click', async () => {
    const id_movimiento = document.getElementById('delete-id-movement').value;
    await deleteMovement(id_movimiento);

    // Cerrar el modal y mostrar alerta
    bootstrap.Modal.getInstance(document.getElementById('delete-modal')).hide();
    Swal.fire({
        title: 'Movimiento eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Recarga la tabla con los datos actualizados
    await refreshState(movementsState, getMovements)
    movementsFilter();
});
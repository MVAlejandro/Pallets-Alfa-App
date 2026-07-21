// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { updateCount, deleteCount, getCounts } from '../../services/counts-service.js'; 
import { requireActionPermission, validatePermissions } from "../../../../core/auth/auth-validate.js";
// Funciones del módulo
import { countsFilter, countsState } from './counts-filter.js';
// Validaciones
import { validateEditCount } from '../../validators/count-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para cargar datos en el modal
export async function renderCountsEditModal(conteo) {
    // Insertar valores en los inputs
    document.getElementById('edit-id-count').value = conteo.id_conteo;
    document.getElementById('edit-date').value = conteo.fecha_conteo;
    document.getElementById('edit-code').value = conteo.codigo_producto;
    document.getElementById('edit-store').value = conteo.almacen;
    document.getElementById('edit-quantity').value = conteo.cantidad_conteo;
    document.getElementById('edit-observations').value = conteo.observaciones;
    // Insertar los registros del historial
    document.getElementById('header-status').textContent = conteo.estado = "CONFIRMADO" ? '* CONFIRMADO' : '- CANCELADO';
    document.getElementById('header-id-count').textContent = `#INVC-${conteo.id_conteo}`;
    document.getElementById('modal-user-created').textContent = `${conteo.usuario_creacion || "Sin Registro"} - ${conteo.fecha_creacion}`;
    document.getElementById('modal-user-history').textContent = `${conteo.usuario_modificacion || "Sin Registro"} - ${conteo.fecha_modificacion}`;

    // Función para intentar la actualización del conteo
    document.querySelector('#count-edit-form').addEventListener('submit', editCount);

    // Validar permisos del usuario
    validatePermissions()
}

// Función para guardar cambios
export async function editCount(e) {
    e.preventDefault();

    // Validar permisos del usuario
    if (!requireActionPermission('conteos.editar')) {
        return;
    }

    const form = e.currentTarget;
    
    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="ps-2">Actualizando...</p>`;
    }
    
    if (!validateEditCount(form)) {
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

    const id_conteo = document.getElementById('edit-id-count').value;
    const updatedData = {
        cantidad_conteo: form.querySelector('#edit-quantity').value.trim(),
        observaciones: form.querySelector('#edit-observations').value.trim()
    };

    try {
        await updateCount(id_conteo, updatedData);

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();
        Swal.fire({
            title: 'Conteo actualizado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga la tabla con los datos actualizados
        await refreshState(countsState, getCounts)
        countsFilter();
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar conteo:',
            text: error.message || 'Ocurrió un error al actualizar el conteo',
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
    // Validar permisos del usuario
    if (!requireActionPermission('conteos.eliminar')) {
        return;
    }

    const id_conteo = document.getElementById('delete-id-count').value;
    await deleteCount(id_conteo);

    // Cerrar el modal y mostrar alerta
    bootstrap.Modal.getInstance(document.getElementById('delete-modal')).hide();
    Swal.fire({
        title: 'Conteo eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
    });

    // Recarga la tabla con los datos actualizados
    await refreshState(countsState, getCounts)
    countsFilter();
});
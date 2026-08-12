// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { createRemove } from '../../../rrhh/services/removed-staff-service.js'; 
import { deleteStaff, getStaffs, findStaff } from '../../services/staff-service.js'; 
import { requireActionPermission, validatePermissions } from "../../../../core/auth/auth-validate.js";
// Funciones del módulo
import { staffFilter, staffState } from './staff-filter.js';
import { renderStaffEditForm } from './staff-view.js';
// Validaciones
import { validateStaffRemove } from '../../validators/staff-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para cargar datos en el modal
export async function renderStaffRemoveModal() {
    // Insertar valores en los inputs
    document.getElementById('header-name').textContent = document.getElementById("name").value;
    document.getElementById('header-num-staff').textContent = `#CATE-${document.getElementById("emp-number").value}`;

    // Función para intentar la eliminación del empleado
    document.querySelector('#remove-modal').addEventListener('submit', removeStaff);

    // Validar permisos del usuario
    validatePermissions()
}

// Función para guardar la baja
export async function removeStaff(e) {
    e.preventDefault()

    // Validar permisos del usuario
    if (!requireActionPermission('empleados.eliminar')) {
        return;
    }

    const empleado_id = document.getElementById('hidden-id-staff').value;
    const form = e.currentTarget;
    
    // Capturar el botón que disparó el evento
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <p class="ps-2">Enviando...</p>`;
    }
    
    if (!validateStaffRemove(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
            
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 
                `Dar de Baja`;
        }
        return
    }

    // Guardar valores
    const newRemoveData = {
        empleado_id: empleado_id,
        motivo: form.querySelector('#remove-motive').value,
        descripcion_baja: form.querySelector('#remove-description').value.trim(),
        recontratacion: form.querySelector('#remove-rehiring').value === "true",
        motivo_recontratacion: form.querySelector('#remove-reason').value.trim(),
    };

    try {
        await createRemove(newRemoveData);
        await deleteStaff(empleado_id);
        
        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('remove-modal')).hide();
        Swal.fire({
            title: 'Empleado dado de baja correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga el formulario con los datos actualizados
        const updatedStaffData = await findStaff(empleado_id)
        await refreshState(staffState, getStaffs)

        staffFilter();
        await renderStaffEditForm(updatedStaffData);
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar empleado:',
            text: error.message || 'Ocurrió un error al dar de baja al empleado',
            icon: 'error',
            confirmButtonText: 'OK'
        });

        console.error(error);
    } finally {
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Dar de Baja`;
        }
    }
}
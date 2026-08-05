// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Funciones del backend
import { updateStaff, getStaffs, findStaff } from '../../services/staff-service.js'; 
import { requireActionPermission, validatePermissions } from "../../../../core/auth/auth-validate.js";
// Funciones del módulo
import { staffFilter, staffState } from './staff-filter.js';
import { renderStaffEditForm } from './staff-view.js';
// Validaciones
import { validateStaffForm } from '../../validators/staff-validator.js';
// Utilidades
import { refreshState } from '../../../../shared/utils/state.js';

// Función para guardar cambios
export async function editStaff(e) {
    e.preventDefault();

    // Validar permisos del usuario
    if (!requireActionPermission('empleados.editar')) {
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

    if (!validateStaffForm(form)) {
        Swal.fire({
            title: 'Error',
            text: 'Datos ingresados no válidos',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        
        // Restaurar estado del botón
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = `Actualizar`;
        }
        return
    }

    const id_empleado = document.getElementById('hidden-id-staff').value;
    const updatedData = {
        numero_empleado: form.querySelector('#emp-number').value.trim(),
        nombre: form.querySelector('#name').value.trim(),
        departamento_id: form.querySelector('#departament').value,
        puesto: form.querySelector('#position').value.trim(),
        fecha_nacimiento: form.querySelector('#birthday').value,
        rfc: form.querySelector('#rfc').value.trim(),
        curp: form.querySelector('#curp').value.trim(),
        nss: form.querySelector('#nss').value.trim(),
        telefono: form.querySelector('#phone').value.trim(),
        direccion: form.querySelector('#direction').value.trim(),
        nombre_emergencia: form.querySelector('#emergency-name').value.trim(),
        parentesco_emergencia: form.querySelector('#emergency-relation').value.trim(),
        telefono_emergencia: form.querySelector('#emergency-phone').value.trim(),
        tipo_sangre: form.querySelector('#blood-type').value.trim(),
        enfermedad: form.querySelector('#illness').value.trim(),
        medicamento: form.querySelector('#medicament').value.trim(),
        alergia: form.querySelector('#allergy').value.trim(),
        calzado: form.querySelector('#boots').value.trim(),
        playera: form.querySelector('#tshirt').value.trim(),
        pantalon: form.querySelector('#pants').value.trim()
    };

    try {
        await updateStaff(id_empleado, updatedData);

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Mostrar alerta
        Swal.fire({
            title: 'Empleado actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga el formulario con los datos actualizados
        const updatedStaffData = await findStaff(id_empleado)
        await refreshState(staffState, getStaffs)

        staffFilter();
        await renderStaffEditForm(updatedStaffData);
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar empleado:',
            text: error.message || 'Ocurrió un error al actualizar el empleado',
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

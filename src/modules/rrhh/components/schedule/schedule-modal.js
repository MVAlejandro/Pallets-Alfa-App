// Dependencias
import { Swal } from '../../../../shared/utils/utils.js';
// Importar el estadoo de los registros
import { staffState } from "./schedule-filter.js";
import { schedulesState  } from "./schedule-view.js";
// Funciones del backend
import { createSchedule, updateSchedule } from '../../services/schedule-service.js'; 
import { requireActionPermission, validatePermissions } from "../../../../core/auth/auth-validate.js";
// Funciones del módulo
import { renderScheduleDetails } from './schedule-view.js';
// Validaciones
import { validateEditSchedule, getScheduleData } from '../../validators/schedule-validator.js';
// Utilidades
import { addDayRow } from '../../utils/schedule-functions.js';

// Arreglo provisional por si no se pasa uno de horarios
const defaultSchedules = [{dia:'LUNES'}, {dia:'MARTES'}, {dia:'MIERCOLES'}, {dia:'JUEVES'}, {dia:'VIERNES'} ,{dia:'SABADO'} ,{dia:'DOMINGO'}]

// Función para cargar datos en el modal
export async function renderScheduleEditModal(staffId) {
    const empleado = staffState.allRecords.find(empleado => empleado.id_empleado == staffId );

    if (!empleado) {
        console.error(`No se encontró el empleado con ID ${staffId}`);
        return;
    }

    let allSchedules = schedulesState.allRecords;

    // Insertar valores en los inputs
    document.getElementById('edit-id-staff').value = empleado.id_empleado;
    // Insertar los registros del historial
    document.getElementById('header-name').textContent = empleado.nombre;
    document.getElementById('header-num-staff').textContent = `#CATE-${empleado.numero_empleado}`;
    document.getElementById('modal-user-created').textContent = `${allSchedules[0]?.usuario_creacion || "Sin Registro"} - ${allSchedules[0]?.fecha_creacion || "----/--/--"}`;
    document.getElementById('modal-user-history').textContent = `${allSchedules[0]?.usuario_modificacion || "Sin Registro"} - ${allSchedules[0]?.fecha_modificacion || "----/--/--"}`;

    // Limpiar filas anteriores
    const container = document.getElementById("schedule-days-container");
    container.innerHTML = '';

    // Si hay registro de horarios generarlos, sino ponerlos vacíos
    if (allSchedules.length == 0) {
        allSchedules = defaultSchedules;
        
    } 
    
    for (const scheduleDay of allSchedules) {
        addDayRow(scheduleDay);
    }

    // Función para intentar la actualización de los horarios
    document.querySelector('#schedule-edit-form').addEventListener('submit', manageSchedule);

    // Validar permisos del usuario
    validatePermissions()
}

// Función para guardar cambios
export async function manageSchedule(e) {
    e.preventDefault();

    // Validar permisos del usuario
    if (!requireActionPermission('horarios.editar')) {
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

    if (!validateEditSchedule(form)) {
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

    const empleado_id = form.querySelector('#edit-id-staff').value;
    const scheduleData = getScheduleData(form);

    try {
        for (const horario of scheduleData) {
            const { id_horario, ...schedule } = horario;
            const data = {
                empleado_id,
                ...schedule
            };

            if (horario.id_horario == "null" || horario.id_horario == null) {
                console.log("crear");
                await createSchedule(data);
            } else {
                console.log("actualizar");
                await updateSchedule(id_horario, data);
            }
        }

        form.querySelectorAll('.is-valid, .is-invalid').forEach(e => {
            e.classList.remove('is-valid', 'is-invalid');
        });

        // Cerrar el modal y mostrar alerta
        bootstrap.Modal.getInstance(document.getElementById('edit-modal')).hide();

        Swal.fire({
            title: 'Horario actualizado correctamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });

        // Recarga la tabla con los datos actualizados
        await renderScheduleDetails(empleado_id);
    } catch (error) {
        Swal.fire({
            title: 'Error al actualizar horario:',
            text: error.message || 'Ocurrió un error al actualizar el horario',
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
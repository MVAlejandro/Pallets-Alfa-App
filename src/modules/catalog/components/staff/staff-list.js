// Importar el estadoo de los registros
import { staffState } from "./staff-filter.js";
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";

// Función para crear la lista de empleados
export async function renderStaffList() {
    const container = document.getElementById('staff-list');
    const allStaff = staffState.visibleRecords;

    // Limpiar lista antes de insertar
    container.innerHTML = '';

    if (!allStaff || allStaff.length === 0) {
        container.innerHTML = `<p>No hay registros que mostrar</p>`;
        return;
    }

    allStaff.forEach(staff => {
        // Determinar el color del nombre en base a su estado
        let statusClass = '';
        if (staff.estado == "ACTIVO") {
            statusClass = 'black';
        } else if (staff.estado == 'INACTIVO') {
            statusClass = 'red';
        } else if (staff.estado == 'PENDIENTE') {
            statusClass = 'grey';
        }

        container.innerHTML += 
        `<button type="button" class="list-group-item list-group-item-action" staff-id='${staff.id_empleado}'>
            <div class="staff-item">
                <p class="staff-name fw-bold" style="color:${statusClass} !important">${staff.nombre}</p>
                <p class="staff-number">No ${staff.numero_empleado} - <span class="staff-position">${staff.puesto}</span></p>
            </div>
        </button>`;
    });

    // Validar permisos del usuario
    validatePermissions()
}
// Importar el estadoo de los registros
import { staffState } from "./schedule-filter.js";
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";

// Función para crear la lista de empleados
export async function renderScheduleList() {
    const container = document.getElementById('staff-list');
    const allStaff = staffState.visibleRecords;

    // Limpiar lista antes de insertar
    container.innerHTML = '';

    if (!allStaff || allStaff.length === 0) {
        container.innerHTML = `<p>No hay registros que mostrar</p>`;
        return;
    }

    allStaff.forEach(staff => {
        container.innerHTML += 
        `<button type="button" class="list-group-item list-group-item-action" staff-id='${staff.id_empleado}' style="${staff.tiempo_extra === true ? "background-color: var(--yellow-light)" : ""}">
            <div class="staff-item">
                <p class="staff-name fw-bold">${staff.nombre} ${staff.tiempo_extra === true ? "*" : ""}</p>
                <p class="staff-number">No ${staff.numero_empleado} - <span class="staff-position">${staff.puesto}</span></p>
            </div>
        </button>`;
    });

    // Validar permisos del usuario
    validatePermissions()
}
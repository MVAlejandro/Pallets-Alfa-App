// Importar el estadoo de los registros
import { schedulesState } from "./schedule-view.js";
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";
// Utilidades
import { determinateSchedule } from "../../utils/schedule-functions.js";

// Función para crear la tabla y la paginación
export async function renderScheduleTable() {
    const tbody = document.querySelector('#schedule-table tbody');
    const allSchedules = schedulesState.allRecords;

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!allSchedules || allSchedules.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="2">No hay horarios registrados</td></tr>`;
        return;
    }

    allSchedules.forEach(horario => {
        tbody.innerHTML += 
            `<tr>
                <td class="text-center fw-bold">${horario.dia.slice(0, 3)}</td>
                <td class="text-center">${determinateSchedule(horario)}</td>
            </tr>`;
    });

    // Validar permisos del usuario
    validatePermissions()
}
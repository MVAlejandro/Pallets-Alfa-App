// Importar el estadoo de los registros
import { schedulesState } from "./schedule-module.js";
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";

// Función para ordenar los horarios
function determinateSchedule(horario) {
    let entrada = "00:00";
    let salida = "00:00";

    if (horario.entrada != null) {
        entrada = horario.entrada.slice(0, 5);
    }

    if (horario.salida != null) {
        salida = horario.salida.slice(0, 5);
    }

    let formato = `${entrada} - ${salida}`;

    if (formato == "00:00 - 00:00") {
        return "Descanso"
    } else {
        return formato
    }
}

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
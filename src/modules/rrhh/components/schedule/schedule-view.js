// Funciones del backend
import { findSchedules } from '../../services/schedule-service.js'; 
import { findExtraTime } from '../../services/extra-time-service.js'
// Funciones del módulo
import { generateForm } from './generate-form.js';
import { renderScheduleTable } from './schedule-table.js'; 
import { renderPendingExtraTimeTable, renderExtraTimeTable } from '../extra-time/extra-table.js'
// Utilidades
import { debounce } from '../../../../shared/utils/utils.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los horarios y horas extra para su manejo en la tabla
export const schedulesState = createModuleState();
export const extraState = createModuleState();

export async function renderScheduleDetails(id_empleado) {
    // Obtener horarios y horas extra con el id
    await refreshState(schedulesState, () => findSchedules(id_empleado));
    await refreshState(extraState, () => findExtraTime(id_empleado));

    extraState.currentPage = 1;

    //Generar contenido base
    await generateForm();

    // Asignar id_empleado a los botones
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.dataset.id = id_empleado;
    });
    
    // Rellenar toda la información
    renderScheduleTable();
    renderPendingExtraTimeTable();
    renderExtraTimeTable();
}
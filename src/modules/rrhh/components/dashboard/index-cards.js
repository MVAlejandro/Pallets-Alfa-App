// Funciones del backend
import { getStaffs } from '../../../catalog/services/staff-service.js';
// import { getCounts } from '../../services/counts-service.js';
// import { getMovements } from '../../services/movements-service.js';
// import { generateGralSummaries } from '../../services/reports-service.js';
// Funciones del módulo
// import { renderCountsCard, renderDifferenceCard, renderReliabilityCard } from "./resume-cards.js";
// import { renderGralGraphic } from '../reports/reports-graphic';
// Utilidades
import { getDateParts } from '../../../../shared/utils/time-functions.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';
import { renderStaffCard } from '../../../catalog/components/dashboard/resume-cards.js';

// Crear el estado de los registros para su manejo
export const staffState = createModuleState();
// export const movementsState = createModuleState();
// export const countsState = createModuleState();
// let allSummaries = [];

export async function initDashboard() {
    // Obtener empleados, asistencias y permisos
    await refreshState(staffState, getStaffs);
    // await refreshState(movementsState, getMovements)
    // await refreshState(countsState, getCounts)
    // Obtener el resumen de movimientos y conteos
    // allSummaries = await generateGralSummaries(movementsState.allRecords, countsState.allRecords);

    // if (!allSummaries || allSummaries.length === 0) { return; }

    // Obtener la fecha del último registro, y la fecha actual
    // const lastSummarie = allSummaries[allSummaries.length - 1];
    const today = new Date();

    // Elementos para las cards
    const weekText = document.getElementById('week-text');

    // Insertar los valores
    weekText.className = "text-muted general-report-cant"
    weekText.innerText = `${getDateParts(today).semana}`;
    
    renderStaffCard(staffState.allRecords)
    // renderCountsCard(lastSummarie)
    // renderDifferenceCard(lastSummarie);
    // renderReliabilityCard(lastSummarie);
    // renderGralGraphic(allSummaries, getDateParts(today).anio);
}

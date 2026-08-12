// Funciones del backend
import { getStaffs } from '../../services/staff-service.js'
import { getProducts } from '../../services/products-service.js'; 
// Funciones del módulo
import { renderStaffCard, renderProductsCard } from './resume-cards.js';
// Utilidades
import { getDateParts } from '../../../../shared/utils/time-functions.js'; 
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los registros para su manejo
export const staffState = createModuleState();
export const productsState = createModuleState();

export async function initDashboard() {
    // Obtener registros
    await refreshState(staffState, getStaffs);
    await refreshState(productsState, getProducts);

    // Obtener la la fecha actual
    const today = new Date();

    // Elementos para las cards
    const weekText = document.getElementById('week-text');

    // Insertar los valores
    weekText.className = "text-muted general-report-cant"
    weekText.innerText = `${getDateParts(today).semana}`;
    
    renderStaffCard(staffState.allRecords)
    renderProductsCard(productsState.allRecords);
}

// Funciones del backend
import { getProducts } from '../../../catalog/services/products-service.js'; 
import { getCounts } from '../../services/counts-service.js';
import { getMovements } from '../../services/movements-service.js'; 
import { generateGralSummaries } from '../../services/reports-service.js';
// Funciones del módulo
import { renderDifferenceCard, renderReliabilityCard } from "../reports/reports-gral-cards.js";
import { renderGralGraphic } from '../reports/reports-graphic'; 
// Utilidades
import { getDateParts } from '../../../../shared/utils/time-functions.js'; 
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear los estados de los movimientos y conteos para su manejo
export const productsState = createModuleState();
export const movementsState = createModuleState();
export const countsState = createModuleState();
let allSummaries = [];

export async function initDashboard() {
    // Obtener movimientos y conteos
    await refreshState(productsState, getProducts);
    await refreshState(movementsState, getMovements)
    await refreshState(countsState, getCounts)
    // Obtener el resumen de movimientos y conteos
    allSummaries = await generateGralSummaries(movementsState.allRecords, countsState.allRecords);

    if (!allSummaries || allSummaries.length === 0) { return; }

    // Obtener la fecha del último registro, su semana y su año
    const lastSummarie = allSummaries[allSummaries.length - 1];
    let lastWeek = getDateParts(lastSummarie.fecha).semana;
    let lastYear = getDateParts(lastSummarie.fecha).anio;

    // Elementos para las cards
    const productText = document.getElementById('products-text');
    const countsText = document.getElementById('counts-text');
    const weekText = document.getElementById('week-text');

    // Insertar los valores
    productText.className = "text-primary general-report-cant"
    productText.innerText = `${productsState.allRecords.length}`;

    countsText.className = "general-report-cant"
    countsText.innerText = `${lastSummarie.total_contado.toLocaleString('en-US')}`;

    weekText.className = "text-muted general-report-cant"
    weekText.innerText = `${lastWeek}`;
    
    renderDifferenceCard(lastSummarie || {});
    renderReliabilityCard(lastSummarie || {});
    renderGralGraphic(allSummaries, lastYear);
}

// Funciones del backend
import { getProducts } from '../../services/products-service.js'; 
// Funciones del módulo
import { renderProductsCard } from './resume-cards.js';
// Utilidades
import { getDateParts } from '../../../../shared/utils/time-functions.js'; 
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear los estados de los productos para su manejo
export const productsState = createModuleState();

export async function initDashboard() {
    // Obtener productos
    await refreshState(productsState, getProducts);

    // Obtener la la fecha actual
    const today = new Date();

    // Elementos para las cards
    const weekText = document.getElementById('week-text');

    // Insertar los valores
    weekText.className = "text-muted general-report-cant"
    weekText.innerText = `${getDateParts(today).semana}`;
    
    renderProductsCard(productsState.allRecords);
}

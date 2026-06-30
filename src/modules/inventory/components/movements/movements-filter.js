// Funciones del backend
import { getMovements } from '../../services/movements-service.js'; 
// Funciones del módulo
import { renderMovementsTable } from './movements-table.js';
// Utilidades
import { debounce, loadDateFilter } from '../../../../shared/utils/utils.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los productos para su manejo en la tabla
export const movementsState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initMovementsModule() {
    loadDateFilter("#date-filter", false);

    // Obtener productos y renderizar tabla inicial
    await refreshState(movementsState, getMovements)

    applyMovementsFilter()
    
    const form = document.getElementById('filter-form');
    const date = document.getElementById('date-filter');
    const type = document.getElementById('movement-filter');

    // Declarar el botón de filtrado del formulario
    form.addEventListener('submit', e => {
        e.preventDefault();
        applyMovementsFilter();
    });

    // Escuchar los cambios en tiempo real de los inputs
    date.addEventListener('input', debounce(applyMovementsFilter, 400));
    type.addEventListener('change', applyMovementsFilter);
}

function applyMovementsFilter() {
    movementsState.currentPage = 1;
    movementsFilter();
}

// Función de filtrado por valores seleccionados
export async function movementsFilter() {
    const dateFilter = document.getElementById('date-filter');
    const movementFilter = document.getElementById('movement-filter').value;

    let startDate = null;
    let endDate = null;

    // Obtener rango de fechas
    if (dateFilter?.value) {
        const range = dateFilter.value.split(' a ');
        startDate = range[0];                 
        endDate = range[1] || range[0];
    }

    // Si no hay filtros activos, mostrar todo
    const filterClean = !startDate && movementFilter === '0';

    if (filterClean) {
        movementsState.visibleRecords = movementsState.allRecords;
        renderMovementsTable();
        return;
    }

    // Aplicar filtros
    const filtered = movementsState.allRecords.filter(m => {
        let dateOk = true;
        if (startDate) {
            const fecha = m.fecha.slice(0, 10);
            dateOk = fecha >= startDate && fecha <= endDate;
        }

        const typeOk = movementFilter === '0' || m.tipo_movimiento == movementFilter;

        return dateOk && typeOk;
    });

    movementsState.visibleRecords = filtered;

    renderMovementsTable();
}

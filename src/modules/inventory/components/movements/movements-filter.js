// Funciones del backend
import { getMovements } from '../../services/movements-service.js'; 
// Funciones del módulo
import { renderMovementsTable } from './movements-table.js';
// Utilidades
import { debounce } from '../../../../shared/utils/utils.js';
import { loadDateFilter } from '../../../../shared/utils/load-select.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los movimientos para su manejo en la tabla
export const movementsState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initMovementsModule() {
    const dateFilter = loadDateFilter("#date-filter", false);

    // Obtener movimientos y renderizar tabla inicial
    await refreshState(movementsState, getMovements)

    applyMovementsFilter()
    
    const form = document.getElementById('filter-form');
    const date = document.getElementById('date-filter');
    const type = document.getElementById('movement-filter');

    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        dateFilter.clear();
        form.reset();
        applyMovementsFilter()
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
    const resultsText = document.getElementById('total-text');

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
        resultsText.textContent = `Total Registros: ${movementsState.visibleRecords.length.toLocaleString('en-US')}`;
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

    resultsText.textContent = `Total Registros: ${movementsState.visibleRecords.length.toLocaleString('en-US')}`;
    renderMovementsTable();
}

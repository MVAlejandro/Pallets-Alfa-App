// Funciones del backend
import { getCounts } from '../../services/counts-service.js';
import { getStores } from '../../../catalog/services/product-store-service.js';
import { getProducts } from '../../../catalog/services/products-service.js';
// Funciones del módulo
import { renderCountsTable } from './counts-table.js';
// Utilidades
import { debounce } from '../../../../shared/utils/utils.js';
import { loadDateFilter, loadOptions } from '../../../../shared/utils/load-select.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los conteos para su manejo en la tabla
export const countsState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initCountsModule() {
    const dateFilter = loadDateFilter("#date-filter", false);
    loadOptions('store-filter', getStores, 'id_almacen', 'nombre');
    loadOptions('code-filter', getProducts, 'id_producto', 'codigo');

    // Obtener conteos y renderizar tabla inicial
    await refreshState(countsState, getCounts)

    applyCountsFilter()
    
    const form = document.getElementById('filter-form');
    const date = document.getElementById('date-filter');
    const store = document.getElementById('store-filter');
    const code = document.getElementById('code-filter');

    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        dateFilter.clear();
        form.reset();
        applyCountsFilter()
    });

    // Escuchar los cambios en tiempo real de los inputs
    date.addEventListener('input', debounce(applyCountsFilter, 400));
    store.addEventListener('change', applyCountsFilter);
    code.addEventListener('change', applyCountsFilter);
}

function applyCountsFilter() {
    countsState.currentPage = 1;
    countsFilter();
}

// Función de filtrado por valores seleccionados
export async function countsFilter() {
    const dateFilter = document.getElementById('date-filter');
    const storeFilter = document.getElementById('store-filter').value;
    const codeFilter = document.getElementById('code-filter').value;

    let startDate = null;
    let endDate = null;

    // Obtener rango de fechas
    if (dateFilter?.value) {
        const range = dateFilter.value.split(' a ');
        startDate = range[0];                 
        endDate = range[1] || range[0];
    }

    // Si no hay filtros activos, mostrar todo
    const filterClean = !startDate && storeFilter === '0' && codeFilter === '0';

    if (filterClean) {
        countsState.visibleRecords = countsState.allRecords;
        renderCountsTable();
        return;
    }

    // Aplicar filtros
    const filtered = countsState.allRecords.filter(c => {
        let dateOk = true;
        if (startDate) {
            const fecha = c.fecha_conteo.slice(0, 10);
            dateOk = fecha >= startDate && fecha <= endDate;
        }

        const storeOk = storeFilter === '0' || c.id_almacen == storeFilter;
        const codeOk = codeFilter === '0' || c.id_producto == codeFilter;

        return dateOk && codeOk && storeOk;
    });

    countsState.visibleRecords = filtered;

    renderCountsTable();
}
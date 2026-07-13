// Funciones del backend
import { getStores } from '../../../catalog/services/product-store-service.js';
import { getCounts } from '../../services/counts-service.js';
import { getMovements } from '../../services/movements-service.js'; 
import { generateGralSummaries } from '../../services/reports-service.js';
// Funciones del módulo
import { renderIndReportTable } from './reports-ind-table.js';
import { renderGralReportTable } from './reports-gral-table.js';
import { renderGralGraphic } from './reports-graphic.js';
// Utilidades
import { debounce } from '../../../../shared/utils/utils.js';
import { loadDateFilter, loadOptions } from '../../../../shared/utils/load-select.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear los estados de los movimientos y conteos para su manejo
export const movementsState = createModuleState();
export const countsState = createModuleState();
let allSummaries = [];

// Función de filtrado y renderizado inicial
export async function initReportsModule() {
    // Obtener movimientos y conteos
    await refreshState(movementsState, getMovements)
    await refreshState(countsState, getCounts)
    // Obtener el resumen de movimientos y conteos
    allSummaries = await generateGralSummaries(movementsState.allRecords, countsState.allRecords);

    // Obtener la fecha del último conteo
    const lastCount = countsState.allRecords[countsState.allRecords.length - 1];
    let lastDate = new Date();;

    if (lastCount) {
        lastDate = new Date(lastCount.fecha_conteo);
    }

    // Inicializar el flatpickr con esa fecha
    const dateFilter = loadDateFilter("#date-filter", [lastDate, lastDate]);
    loadOptions('store-filter', getStores, 'id_almacen', 'nombre');

    applyReportsFilter();
    
    const form = document.getElementById('general-filter-form');
    const date = document.getElementById('date-filter');
    const period = document.getElementById('period-filter');
    const store = document.getElementById('store-filter');
    
    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        form.reset();
        dateFilter.setDate([lastDate, lastDate], false);
        applyReportsFilter();
    });

    // Escuchar los cambios en tiempo real de los inputs
    date.addEventListener('input', debounce(applyReportsFilter, 800));
    period.addEventListener('change', gralGraphicFilter);
    store.addEventListener('change', indReportFilter);
}

function applyReportsFilter() {
    gralReportFilter();
    gralGraphicFilter();
    indReportFilter();
}

// Función de filtrado para reporte individual por almacenes
export async function indReportFilter() {
    const dateFilter = document.getElementById('date-filter');
    const storeFilter = document.getElementById('store-filter').value;

    let startDate = null;
    let endDate = null;

    // Obtener rango de fechas
    if (dateFilter?.value) {
        const range = dateFilter.value.split(' a ');
        startDate = range[0];                 
        endDate = range[1] || range[0];
    }

    // Si no hay fecha seleccionada, mostrar tabla vacía
    if (!startDate) {
        countsState.visibleRecords = [];
        renderIndReportTable();
        return;
    }

    // Aplicar filtros solo con fecha seleccionada
    const filtered = countsState.allRecords.filter(c => {
        const fecha = c.fecha_conteo.slice(0, 10);

        const dateOk = fecha >= startDate && fecha <= endDate;
        const storeOk = storeFilter === "0" || c.id_almacen == storeFilter;

        return dateOk && storeOk;
    });

    countsState.visibleRecords = filtered;

    renderIndReportTable();
}

// Función de filtrado para reporte general por fecha seleccionada
export async function gralReportFilter() {
    const dateFilter = document.getElementById('date-filter');
    const periodFilter = document.getElementById('period-filter').value;

    let startDate = null;
    let endDate = null;

    // Obtener rango de fechas
    if (dateFilter?.value) {
        const range = dateFilter.value.split(' a ');
        startDate = range[0];                 
        endDate = range[1] || range[0];
    }

    // Si no hay fecha seleccionada, mostrar tabla vacía
    if (!startDate) {
        renderGralReportTable([]);
        return;
    }

    // Aplicar filtros
    const filtered = allSummaries.filter(s => {
        let dateOk = true;
        if (startDate) {
            const fecha = s.fecha.slice(0, 10);
            dateOk = fecha >= startDate && fecha <= endDate;
        }
    
        return dateOk
    });

    renderGralReportTable(filtered);
}

export function gralGraphicFilter() {
    const period = document.getElementById("period-filter").value;

    renderGralGraphic(allSummaries, period);
}

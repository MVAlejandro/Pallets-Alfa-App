// Funciones del backend
import { getDepartaments } from '../../../catalog/services/staff-service.js';
import { getActiveStaff } from '../../services/active-staff-service.js'; 
// Funciones del módulo
import { renderScheduleList } from './schedule-list.js'; 
// Utilidades
import { loadOptions } from '../../../../shared/utils/load-select.js';
import { debounce } from '../../../../shared/utils/utils.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los empleados para su manejo en la tabla
export const staffState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initScheduleModule() {
    loadOptions('departament-filter', getDepartaments, 'id_departamento', 'nombre');

    // Obtener empleados activos y renderizar lista
    const today = new Date().toLocaleDateString('en-CA');
    await refreshState(staffState, () => getActiveStaff(today));

    applyScheduleFilter();
    
    const form = document.getElementById('filter-form');
    const departament = document.getElementById('departament-filter');
    const search = document.getElementById('search-filter');

    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        form.reset();
        applyScheduleFilter()
    });

    // Escuchar los cambios en tiempo real de los inputs
    departament.addEventListener('change', applyScheduleFilter);
    search.addEventListener('input', debounce(applyScheduleFilter, 400));
}

function applyScheduleFilter() {
    staffState.currentPage = 1;
    scheduleFilter();
}

// Función de filtrado por valores seleccionados
export async function scheduleFilter() {
    const searchText = document.getElementById('search-filter').value.trim().toLowerCase();
    const departamentFilter = document.getElementById('departament-filter').value;
    const resultsText = document.getElementById('total-text');

    // Si no hay filtros activos, mostrar todo
    const filterClean = searchText === '' && departamentFilter === '0';

    if (filterClean) {
        staffState.visibleRecords = staffState.allRecords;
        resultsText.textContent = `Total Registros: ${staffState.visibleRecords.length.toLocaleString('en-US')}`;
        renderScheduleList();
        return;
    }

    // Aplicar filtros
    const filtered = staffState.allRecords.filter(s => {
        const searchOk = searchText === '' || s.numero_empleado?.toString().toLowerCase().includes(searchText) || s.nombre?.toString().toLowerCase().includes(searchText);
        const departamentOk = departamentFilter === '0' || s.departamento_id == departamentFilter;

        return searchOk && departamentOk;
    });

    staffState.visibleRecords = filtered;

    resultsText.textContent = `Total Registros: ${staffState.visibleRecords.length.toLocaleString('en-US')}`;
    renderScheduleList();
}

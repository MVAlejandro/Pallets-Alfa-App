// Funciones del backend
import { getDepartaments, getStaffs } from '../../services/staff-service.js';
// Funciones del módulo
import { renderStaffList } from './staff-list.js';
// Utilidades
import { loadOptions } from '../../../../shared/utils/load-select.js';
import { debounce } from '../../../../shared/utils/utils.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los empleados para su manejo en la tabla
export const staffState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initStaffModule() {
    loadOptions('departament-filter', getDepartaments, 'id_departamento', 'nombre');

    // Obtener empleados y renderizar lista
    await refreshState(staffState, getStaffs);

    applyStaffFilter();
    
    const form = document.getElementById('filter-form');
    const departament = document.getElementById('departament-filter');
    const status = document.getElementById('status-filter');
    const search = document.getElementById('search-filter');

    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        form.reset();
        applyStaffFilter()
    });

    // Escuchar los cambios en tiempo real de los inputs
    departament.addEventListener('change', applyStaffFilter);
    status.addEventListener('change', applyStaffFilter);
    search.addEventListener('input', debounce(applyStaffFilter, 400));
}

function applyStaffFilter() {
    staffState.currentPage = 1;
    staffFilter();
}

// Función de filtrado por valores seleccionados
export async function staffFilter() {
    const searchText = document.getElementById('search-filter').value.trim().toLowerCase();
    const departamentFilter = document.getElementById('departament-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const resultsText = document.getElementById('total-text');

    // Si no hay filtros activos, mostrar todo
    const filterClean = searchText === '' && departamentFilter === '0' && statusFilter === '0';

    if (filterClean) {
        staffState.visibleRecords = staffState.allRecords;
        resultsText.textContent = `Total Registros: ${staffState.visibleRecords.length.toLocaleString('en-US')}`;
        renderStaffList();
        return;
    }

    // Aplicar filtros
    const filtered = staffState.allRecords.filter(s => {
        const searchOk = searchText === '' || s.numero_empleado?.toString().toLowerCase().includes(searchText) || s.nombre?.toString().toLowerCase().includes(searchText);
        const departamentOk = departamentFilter === '0' || s.departamento_id == departamentFilter;
        const statusOk = statusFilter === '0' || s.estado == statusFilter;

        return searchOk && departamentOk && statusOk;
    });

    staffState.visibleRecords = filtered;

    resultsText.textContent = `Total Registros: ${staffState.visibleRecords.length.toLocaleString('en-US')}`;
    renderStaffList();
}

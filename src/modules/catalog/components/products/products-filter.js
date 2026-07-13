// Funciones del backend
import { getProducts } from '../../services/products-service.js'; 
import { getStores } from '../../services/product-store-service.js';
// Funciones del módulo
import { renderProductsTable } from './products-table.js';
// Utilidades
import { loadOptions } from '../../../../shared/utils/load-select.js';
import { debounce } from '../../../../shared/utils/utils.js';
import { createModuleState, refreshState } from '../../../../shared/utils/state.js';

// Crear el estado de los productos para su manejo en la tabla
export const productsState = createModuleState();

// Función de filtrado y renderizado inicial
export async function initProductsModule() {
    loadOptions('store-filter', getStores, 'id_almacen', 'nombre');

    // Obtener productos y renderizar tabla inicial
    await refreshState(productsState, getProducts);

    applyProductsFilter();
    
    const form = document.getElementById('filter-form');
    const store = document.getElementById('store-filter');
    const search = document.getElementById('search-filter');

    // Declarar el botón de limpieza de filtros
    document.getElementById("clear-filters").addEventListener('click', () => {
        form.reset();
        applyProductsFilter()
    });

    // Escuchar los cambios en tiempo real de los inputs
    store.addEventListener('change', applyProductsFilter);
    search.addEventListener('input', debounce(applyProductsFilter, 400));
}

function applyProductsFilter() {
    productsState.currentPage = 1;
    productsFilter();
}

// Función de filtrado por valores seleccionados
export async function productsFilter() {
    const storeFilter = document.getElementById('store-filter').value;
    const searchText = document.getElementById('search-filter').value.trim().toLowerCase();
    const resultsText = document.getElementById('total-text');

    // Si no hay filtros activos, mostrar todo
    const filterClean = storeFilter === '0' && searchText === '';

    if (filterClean) {
        productsState.visibleRecords = productsState.allRecords;
        resultsText.textContent = `Total Registros: ${productsState.visibleRecords.length.toLocaleString('en-US')}`;
        renderProductsTable();
        return;
    }

    // Aplicar filtros
    const filtered = productsState.allRecords.filter(p => {
        const searchOk =
            searchText === '' ||
            Object.values(p).some(valor => valor?.toString().toLowerCase().includes(searchText));

        const storeOk = storeFilter === '0' || p.almacenes_id?.split(',').includes(storeFilter);
        return storeOk && searchOk;
    });

    productsState.visibleRecords = filtered;

    resultsText.textContent = `Total Registros: ${productsState.visibleRecords.length.toLocaleString('en-US')}`;
    renderProductsTable();
}

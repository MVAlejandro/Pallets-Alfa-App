// Importar el estadoo de los registros
import { countsState } from "./counts-filter.js";
// Funciones del backend
import { validatePermissions } from "../../../../core/auth/auth-validate.js";
// Utilidades
import { getDateParts } from "../../../../shared/utils/time-functions.js";

const perPage = 15;

// Función para crear la tabla y la paginación
export async function renderCountsTable() {
    const tbody = document.querySelector('#counts-table tbody');
    const pagination = document.querySelector('#counts-pages .pagination');
    const resultsText = document.getElementById('counts-pages-results');

    // Calcular productos de la página actual
    const pageStart = (countsState.currentPage - 1) * perPage;
    const pageEnd = pageStart + perPage;
    const counts = countsState.visibleRecords.slice(pageStart, pageEnd);

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!counts || counts.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="8">No hay conteos registrados</td></tr>`;
        resultsText.textContent = `Mostrando 0 de ${counts.length} resultados`;
        pagination.innerHTML = '';
        return;
    }

    counts.forEach(conteo => {
        tbody.innerHTML += 
        `<tr>
            <td class="p-2 ps-4">
                <p class="count-week">Semana ${getDateParts(conteo.fecha_conteo).semana || "Sin definir"}</p>
                <p class="count-date">${conteo.fecha_conteo}</p>
            </td>
            <td class="p-2">
                <p class="count-code fw-bold">${conteo.codigo_producto}</p>
                <p class="count-product">${conteo.descripcion_producto}</p>
            </td>
            <td class="count-store text-center p-2">${conteo.almacen}</td>
            <td class="count-quantity text-center p-2">${conteo.cantidad_conteo.toLocaleString('en-US')}</td>
            <td class="count-observation fst-italic p-2">${conteo.observaciones}</td>
            <td class="count-controls text-end p-2 pe-4">
                <div class="action-buttons">
                    <button class="btn btn-edit d-none" data-permission="conteos.ver" data-bs-target="#edit-modal" data-bs-toggle="modal" title="Editar conteo"
                        count-data='${JSON.stringify(conteo)}'>
                        <i class="bi bi-info-circle"></i>
                    </button>
                    <button class="btn btn-delete d-none" data-permission="conteos.eliminar" data-bs-target="#delete-modal" data-bs-toggle="modal" title="Eliminar conteo"
                        data-id='${conteo.id_conteo}'>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    });

    // Actualizar texto de resultados
    const total = countsState.visibleRecords.length;
    resultsText.textContent = `Mostrando ${Math.min(pageStart + 1, total)} a ${Math.min(pageEnd, total)} de ${total} resultados`;

    // Crear paginación
    const totalPages = Math.ceil(total / perPage);
    pagination.innerHTML = '';
    
    // Corregir página inválida
    if (countsState.currentPage > totalPages) {
        countsState.currentPage = totalPages;
    }

    const maxVisible = 4; // máximo de botones visibles
    let startPage = Math.max(countsState.currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisible + 1, 1);
    }
    
    // Botón Anterior
    pagination.innerHTML += 
        `<li class="page-item ${countsState.currentPage === 1 ? 'disabled' : ''}" data-page="prev">
            <a class="page-link" href="#">&laquo;</a>
        </li>`;
    
    // Primera página + ...
    if (startPage > 1) {
        pagination.innerHTML += 
            `<li class="page-item" data-page="1"><a class="page-link" href="#">1</a></li>`;
        if (startPage > 2) {
            pagination.innerHTML += 
                `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Botones centrales
    for (let i = startPage; i <= endPage; i++) {
        pagination.innerHTML += 
            `<li class="page-item ${i === countsState.currentPage ? 'active' : ''}" data-page="${i}">
                <a class="page-link" href="#">${i}</a>
            </li>`;
    }
    
    // Última página + ...
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagination.innerHTML += 
                `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        pagination.innerHTML += 
            `<li class="page-item" data-page="${totalPages}"><a class="page-link" href="#">${totalPages}</a></li>`;
    }
    
    // Botón Siguiente
    pagination.innerHTML += 
        `<li class="page-item ${countsState.currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="#">&raquo;</a>
        </li>`;
    
    // Añadir los eventos de clic a la paginación
    pagination.querySelectorAll('.page-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const type = item.dataset.page;
    
            if (type === 'prev' && countsState.currentPage > 1) {
                countsState.currentPage--;
            } else if (type === 'next' && countsState.currentPage < totalPages) {
                countsState.currentPage++;
            } else if (!isNaN(parseInt(type))) {
                countsState.currentPage = parseInt(type);
            }

            renderCountsTable();
        });
    });

    // Validar permisos del usuario
    validatePermissions()
}
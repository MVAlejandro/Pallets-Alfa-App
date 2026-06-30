// Importar el estadoo de los registros
import { movementsState } from "./movements-filter.js";
// Utilidades
import { getDateParts } from "../../../../shared/utils/time-functions.js";

const perPage = 15;

// Función para crear la tabla y la paginación
export async function renderMovementsTable() {
    const tbody = document.querySelector('#movements-table tbody');
    const pagination = document.querySelector('#movements-pages .pagination');
    const resultsText = document.getElementById('movements-pages-results');

    // Calcular movimientos de la página actual
    const pageStart = (movementsState.currentPage - 1) * perPage;
    const pageEnd = pageStart + perPage;
    const movements = movementsState.visibleRecords.slice(pageStart, pageEnd);

    // Limpiar tabla antes de insertar
    tbody.innerHTML = '';

    if (!movements || movements.length === 0) {
        tbody.innerHTML = `<tr><td class="text-center" colspan="8">No hay movimientos registrados</td></tr>`;
        resultsText.textContent = `Mostrando 0 de ${movements.length} resultados`;
        pagination.innerHTML = '';
        return;
    }

    movements.forEach(movimiento => {
        tbody.innerHTML += 
        `<tr>
            <td class="p-3 ps-4">
                <p class="movement-week">Semana ${getDateParts(movimiento.fecha).semana || "Sin definir"}</p>
                <p class="movement-date">${movimiento.fecha.split(" ")[0]}</p>
            </td>
            <td class="movement-type p-3">${movimiento.tipo_movimiento}</td>
            <td class="movement-amount p-3">${movimiento.cantidad.toLocaleString('en-US')}</td>
            <td class="movement-observation p-3">${movimiento.observaciones}</td>
            <td class="movement-controls text-end p-3 pe-4">
                <div class="action-buttons">
                    <button class="btn btn-edit" data-bs-target="#edit-modal" data-bs-toggle="modal" title="Editar movimiento"
                        movement-data='${JSON.stringify(movimiento)}'>
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-delete" data-bs-target="#delete-modal" data-bs-toggle="modal" title="Eliminar movimiento"
                        data-id='${movimiento.id_movimiento}'>
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </td>
        </tr>`;
    });

    // Actualizar texto de resultados
    const total = movementsState.visibleRecords.length;
    resultsText.textContent = `Mostrando ${Math.min(pageStart + 1, total)} a ${Math.min(pageEnd, total)} de ${total} resultados`;

    // Crear paginación
    const totalPages = Math.ceil(total / perPage);
    pagination.innerHTML = '';

    // Corregir página inválida
    if (movementsState.currentPage > totalPages) {
        movementsState.currentPage = totalPages;
    }
    
    const maxVisible = 4; // máximo de botones visibles
    let startPage = Math.max(movementsState.currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxVisible + 1, 1);
    }
    
    // Botón Anterior
    pagination.innerHTML += 
        `<li class="page-item ${movementsState.currentPage === 1 ? 'disabled' : ''}" data-page="prev">
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
            `<li class="page-item ${i === movementsState.currentPage ? 'active' : ''}" data-page="${i}">
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
        `<li class="page-item ${movementsState.currentPage === totalPages ? 'disabled' : ''}" data-page="next">
            <a class="page-link" href="#">&raquo;</a>
        </li>`;
    
    // Añadir los eventos de clic a la paginación
    pagination.querySelectorAll('.page-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const type = item.dataset.page;
    
            if (type === 'prev' && movementsState.currentPage > 1) {
                movementsState.currentPage--;
            } else if (type === 'next' && movementsState.currentPage < totalPages) {
                movementsState.currentPage++;
            } else if (!isNaN(parseInt(type))) {
                movementsState.currentPage = parseInt(type);
            }

            renderMovementsTable();
        });
    });
}